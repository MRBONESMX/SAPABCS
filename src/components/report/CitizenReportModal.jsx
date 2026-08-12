import React, { useState } from 'react';
import { Camera, MapPin, Users, ShieldAlert, CheckCircle, AlertOctagon, Send, FileText, CheckCircle2, AlertTriangle, Droplet, UserCheck, Phone, ShieldCheck, Lock, CreditCard } from 'lucide-react';
import { FUGAS_REPORTADAS_MOCK } from '../../data/mockData';

export default function CitizenReportModal({ colonia, onNuevoReporteCreado }) {
  const [fugas, setFugas] = useState(FUGAS_REPORTADAS_MOCK);
  const [modoCrear, setModoCrear] = useState(false);
  
  // Datos de la Incidencia
  const [tipoFuga, setTipoFuga] = useState('Fuga de Agua Potable');
  const [origenFuga, setOrigenFuga] = useState('Toma Domiciliaria / Banqueta');
  const [direccion, setDireccion] = useState('');
  const [fotoAdjunta, setFotoAdjunta] = useState(false);
  
  // Identificación del Emisor
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [telefono, setTelefono] = useState('');
  const [numContratoSapa, setNumContratoSapa] = useState('');
  const [terminosAceptados, setTerminosAceptados] = useState(false);

  const [enviadoExito, setEnviadoExito] = useState(false);

  const handleConfirmarFuga = (id) => {
    setFugas((prev) =>
      prev.map((f) => {
        if (f.id === id) {
          const nuevosVecinos = f.confirmacionesVecinos + 1;
          return {
            ...f,
            confirmacionesVecinos: nuevosVecinos,
            estado: nuevosVecinos >= 3 ? 'Verificado por Comunidad' : f.estado
          };
        }
        return f;
      })
    );
  };

  const handleSubmitReporte = (e) => {
    e.preventDefault();
    if (!terminosAceptados) {
      alert('Debes confirmar que la información proporcionada es verídica.');
      return;
    }

    const idGenerado = `REP-${Math.floor(1000 + Math.random() * 9000)}`;

    const nuevoReporte = {
      id: idGenerado,
      colonia: colonia.nombre,
      coloniaId: colonia.id,
      direccion: direccion || `Calle Principal ${colonia.nombre}`,
      tipo: tipoFuga,
      origen: origenFuga,
      gravedad: 'Alta',
      confirmacionesVecinos: 1,
      fecha: 'Justo ahora',
      estado: 'En Validación Ciudadana',
      reportadoPor: nombreCompleto || 'Vecino Verificado',
      contrato: numContratoSapa || 'CON-88421',
      coords: { top: `${30 + Math.random() * 40}%`, left: `${30 + Math.random() * 40}%` }
    };

    setFugas([nuevoReporte, ...fugas]);
    
    // Notificar al sistema global para enviar alerta focalizada a vecinos
    if (onNuevoReporteCreado) {
      onNuevoReporteCreado({
        id: Date.now(),
        titulo: `Fuga de ${origenFuga} en ${colonia.nombre}`,
        descripcion: `Reportado por ${nombreCompleto || 'Vecino'} en ${direccion || colonia.nombre}. Origen: ${origenFuga}.`,
        tipo: 'warning',
        tiempo: 'Justo ahora',
        coloniaId: colonia.id,
        coloniaNombre: colonia.nombre,
        leida: false
      });
    }

    setEnviadoExito(true);
    setTimeout(() => {
      setEnviadoExito(false);
      setModoCrear(false);
      setDireccion('');
      setNombreCompleto('');
      setTelefono('');
      setNumContratoSapa('');
    }, 2200);
  };

  return (
    <div style={{ paddingBottom: '20px' }}>
      
      {/* Header */}
      <div className="clean-card" style={{ marginBottom: '16px', borderTop: '4px solid var(--alert-red)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert color="var(--alert-red)" size={20} />
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--primary-navy)' }}>
              Reporte Ciudadano de Fugas
            </h3>
          </div>
          <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--alert-red)', background: 'var(--alert-light)', padding: '3px 8px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <UserCheck size={12} /> Autenticado
          </span>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Al registrar el origen preciso de la fuga, la app notificará inmediatamente a los vecinos de tu colonia y sectores colindantes.
        </p>
      </div>

      {/* FORMULARIO DE REPORTE */}
      {!modoCrear ? (
        <button className="btn-solid" onClick={() => setModoCrear(true)} style={{ marginBottom: '16px', background: 'var(--primary-navy)' }}>
          <AlertOctagon size={18} /> Registrar Nuevo Reporte Autenticado
        </button>
      ) : (
        <form onSubmit={handleSubmitReporte} className="clean-card" style={{ marginBottom: '16px', border: '1.5px solid var(--primary-blue)' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary-navy)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileText size={16} color="var(--primary-blue)" /> Formulario de Incidencia
            </h4>
            <span style={{ fontSize: '10px', color: 'var(--water-accent)', fontWeight: 700, background: 'var(--water-light)', padding: '2px 6px', borderRadius: '4px' }}>
              Sector: {colonia.nombre}
            </span>
          </div>

          {/* 1. UBICACIÓN Y ORIGEN DE LA FUGA */}
          <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary-blue)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>
            1. Origen y Ubicación de la Fuga
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              ¿Dónde se origina el derrame o falla? *
            </label>
            <select
              value={origenFuga}
              onChange={(e) => setOrigenFuga(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '13px', fontWeight: 700, background: '#F0F9FF', color: 'var(--primary-navy)' }}
            >
              <option value="Toma Domiciliaria / Banqueta">🏠 Toma Domiciliaria / Cuadro de Banqueta</option>
              <option value="Tubería Principal de Calle">🛣️ Tubo Matriz en Medio de Calle</option>
              <option value="Válvula de Cruce o Esquina">⚙️ Válvula de Esquina / Sector</option>
              <option value="Alcantarilla / Drenaje">⚠️ Alcantarilla o Registro Sanitario</option>
              <option value="Tanque o Pozo Cercano">🏗️ Tanque Elevado o Instalación SAPA</option>
            </select>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Tipo de Incidencia
            </label>
            <select
              value={tipoFuga}
              onChange={(e) => setTipoFuga(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '13px', fontWeight: 700 }}
            >
              <option value="Fuga de Agua Potable">Fuga de Agua Potable</option>
              <option value="Tubo Roto / Chorro Alto">Tubo Roto con Chorro Alto</option>
              <option value="Baja Presión Extrema">Sin Presión en Todo el Bloque</option>
              <option value="Drenaje de Agua Residual">Drenaje / Agua Residual</option>
            </select>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              Calle y Número o Referencia en {colonia.nombre} *
            </label>
            <input
              type="text"
              placeholder="ej. Calle Francisco I. Madero #320"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '13px' }}
            />
          </div>

          {/* Adjuntar Foto */}
          <div 
            onClick={() => setFotoAdjunta(!fotoAdjunta)}
            style={{
              padding: '10px',
              borderRadius: '8px',
              border: '1px dashed ' + (fotoAdjunta ? 'var(--water-accent)' : 'var(--border-subtle)'),
              background: fotoAdjunta ? 'var(--water-light)' : '#F8FAFC',
              textAlign: 'center',
              cursor: 'pointer',
              marginBottom: '16px'
            }}
          >
            <Camera size={20} color={fotoAdjunta ? 'var(--water-accent)' : 'var(--text-muted)'} style={{ marginBottom: '2px' }} />
            <div style={{ fontSize: '11px', fontWeight: 700, color: fotoAdjunta ? 'var(--water-accent)' : 'var(--text-muted)' }}>
              {fotoAdjunta ? '✓ Foto adjuntada (evidencia.jpg)' : 'Tomar o Adjuntar Fotografía'}
            </div>
          </div>

          {/* 2. DATOS DEL CIUDADANO */}
          <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-subtle)', marginBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 800, color: 'var(--primary-navy)', textTransform: 'uppercase', marginBottom: '8px' }}>
              <UserCheck size={14} color="var(--water-accent)" /> 2. Autenticación del Emisor
            </div>

            <div style={{ marginBottom: '8px' }}>
              <label style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '3px' }}>
                Nombre Completo *
              </label>
              <input
                type="text"
                placeholder="ej. Carlos Mendoza"
                value={nombreCompleto}
                onChange={(e) => setNombreCompleto(e.target.value)}
                required
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '12px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
              <div>
                <label style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '3px' }}>
                  Teléfono *
                </label>
                <input
                  type="tel"
                  placeholder="612 123 4567"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '12px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '3px' }}>
                  N° de Contrato SAPA *
                </label>
                <input
                  type="text"
                  placeholder="ej. CON-48201"
                  value={numContratoSapa}
                  onChange={(e) => setNumContratoSapa(e.target.value)}
                  required
                  style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid var(--border-subtle)', fontSize: '12px' }}
                />
              </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer', fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px' }}>
              <input
                type="checkbox"
                checked={terminosAceptados}
                onChange={(e) => setTerminosAceptados(e.target.checked)}
                style={{ marginTop: '2px' }}
              />
              <span>
                Confirmo que el origen y ubicación del reporte corresponden a mi sector.
              </span>
            </label>
          </div>

          {enviadoExito ? (
            <div style={{ background: 'var(--water-light)', color: 'var(--water-accent)', padding: '10px', borderRadius: '8px', textAlign: 'center', fontWeight: 700, fontSize: '13px' }}>
              ✓ Reporte Autenticado y Alerta Notificada a los Vecinos
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" className="btn-solid" style={{ flex: 1 }}>
                <Send size={15} /> Publicar y Notificar a Vecinos
              </button>
              <button 
                type="button" 
                onClick={() => setModoCrear(false)} 
                style={{ padding: '0 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)', background: 'white', fontWeight: 700, cursor: 'pointer' }}
              >
                Cancelar
              </button>
            </div>
          )}
        </form>
      )}

      {/* LISTA DE FUGAS REPORTADAS */}
      <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '10px' }}>
        Fugas Activas en {colonia.nombre} ({fugas.length})
      </h4>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {fugas.map((fuga) => (
          <div key={fuga.id} className="clean-card" style={{ marginBottom: 0, padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
              <div>
                <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--water-accent)', background: 'var(--water-light)', padding: '2px 6px', borderRadius: '4px' }}>
                  {fuga.id}
                </span>
                <h5 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-navy)', marginTop: '2px' }}>
                  {fuga.tipo}
                </h5>
              </div>
              <span className={`badge-flat ${fuga.confirmacionesVecinos >= 3 ? 'badge-con_agua' : 'badge-mantenimiento'}`}>
                {fuga.confirmacionesVecinos >= 3 ? 'Verificado' : 'En Validación'}
              </span>
            </div>

            <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary-blue)', marginBottom: '4px' }}>
              📍 Origen: {fuga.origen || 'Toma Domiciliaria / Banqueta'}
            </div>

            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '6px' }}>
              {fuga.direccion} ({fuga.fecha})
            </p>

            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '10px', background: '#F8FAFC', padding: '4px 8px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <UserCheck size={12} color="var(--water-accent)" />
              <span>Emisor: <b>{fuga.reportadoPor || 'Vecino Autenticado'}</b> (Contrato: {fuga.contrato || 'CON-9912'})</span>
            </div>

            <div style={{ background: '#F8FAFC', padding: '8px 10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: 'var(--primary-navy)' }}>
                <Users size={15} color="var(--water-accent)" />
                <span><b>{fuga.confirmacionesVecinos}</b> confirmaciones</span>
              </div>
              <button
                onClick={() => handleConfirmarFuga(fuga.id)}
                style={{
                  padding: '5px 10px',
                  borderRadius: '6px',
                  background: 'var(--primary-navy)',
                  color: 'white',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '11px',
                  cursor: 'pointer'
                }}
              >
                +1 Confirmar Fuga
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
