import React, { useState } from 'react';
import { Camera, MapPin, Users, ShieldAlert, CheckCircle, AlertOctagon, Send, FileText, CheckCircle2, AlertTriangle, Droplet, UserCheck, Phone, ShieldCheck, Lock, CreditCard, Eye, X, Image as ImageIcon } from 'lucide-react';
import { FUGAS_REPORTADAS_MOCK } from '../../data/mockData';

export default function CitizenReportModal({ colonia, onNuevoReporteCreado }) {
  const [fugas, setFugas] = useState(FUGAS_REPORTADAS_MOCK);
  const [modoCrear, setModoCrear] = useState(false);
  const [imagenModal, setImagenModal] = useState(null); // Estado para visualizar la evidencia en pantalla completa
  
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
      imagenUrl: fotoAdjunta ? '/fuga1.png' : '/fuga2.png', // Imagen de evidencia simulada
      coords: { top: `${30 + Math.random() * 40}%`, left: `${30 + Math.random() * 40}%` }
    };

    setFugas([nuevoReporte, ...fugas]);
    
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
      setFotoAdjunta(false);
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
            <UserCheck size={12} /> Evidencia Autenticada
          </span>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Revisa las evidencias fotográficas adjuntas por los ciudadanos o registra una incidencia en tu zona.
        </p>
      </div>

      {/* FORMULARIO */}
      {!modoCrear ? (
        <button className="btn-solid" onClick={() => setModoCrear(true)} style={{ marginBottom: '16px', background: 'var(--primary-navy)' }}>
          <AlertOctagon size={18} /> Registrar Nuevo Reporte con Evidencia
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

          <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary-blue)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.5px' }}>
            1. Origen y Ubicación de la Fuga
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
              ¿Dónde se origina el derrame? *
            </label>
            <select
              value={origenFuga}
              onChange={(e) => setOrigenFuga(e.target.value)}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', fontSize: '13px', fontWeight: 700, background: '#F0F9FF', color: 'var(--primary-navy)' }}
            >
              <option value="Toma Domiciliaria / Banqueta">Toma Domiciliaria / Banqueta</option>
              <option value="Tubería Principal de Calle">Tubo Matriz en Medio de Calle</option>
              <option value="Válvula de Esquina / Sector">Válvula de Esquina / Sector</option>
              <option value="Alcantarilla / Drenaje">Alcantarilla o Registro Sanitario</option>
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
              {fotoAdjunta ? '✓ Fotografía de evidencia adjuntada (fuga_foto.jpg)' : 'Tomar o Adjuntar Fotografía de Evidencia'}
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
                Confirmo que la fotografía y ubicación corresponden a una incidencia verídica.
              </span>
            </label>
          </div>

          {enviadoExito ? (
            <div style={{ background: 'var(--water-light)', color: 'var(--water-accent)', padding: '10px', borderRadius: '8px', textAlign: 'center', fontWeight: 700, fontSize: '13px' }}>
              ✓ Reporte Autenticado y Fotografías Publicadas
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" className="btn-solid" style={{ flex: 1 }}>
                <Send size={15} /> Publicar Reporte con Evidencia
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

      {/* LISTA DE FUGAS REPORTADAS CON EVIDENCIA FOTOGRÁFICA Y BOTÓN DE VISUALIZACIÓN */}
      <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '10px' }}>
        Fugas Reportadas en {colonia.nombre} ({fugas.length})
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

            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '8px' }}>
              {fuga.direccion} ({fuga.fecha})
            </p>

            {/* SECCIÓN DE EVIDENCIA FOTOGRÁFICA Y BOTÓN PARA VER IMAGEN */}
            {fuga.imagenUrl && (
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  background: '#F0F9FF', 
                  padding: '8px 12px', 
                  borderRadius: '8px', 
                  border: '1px solid #BAE6FD',
                  marginBottom: '10px' 
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: 'var(--primary-navy)' }}>
                  <ImageIcon size={15} color="var(--water-accent)" />
                  <span>Evidencia Fotográfica Adjunta</span>
                </div>

                {/* BOTÓN VER FOTOGRAFÍA */}
                <button
                  onClick={() => setImagenModal(fuga)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    background: 'var(--water-accent)',
                    color: 'white',
                    border: 'none',
                    fontSize: '11px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 2px 4px rgba(0, 119, 182, 0.2)'
                  }}
                >
                  <Eye size={13} /> Ver Fotografía
                </button>
              </div>
            )}

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

      {/* MODAL DESPLEGABLE EN PANTALLA COMPLETA PARA VER LA FOTOGRAFÍA DE LA FUGA */}
      {imagenModal && (
        <div className="bottom-sheet-overlay" onClick={() => setImagenModal(null)}>
          <div className="bottom-sheet" onClick={(e) => e.stopPropagation()} style={{ padding: '16px' }}>
            <div className="sheet-handle" />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div>
                <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--water-accent)', textTransform: 'uppercase' }}>
                  Evidencia Fotográfica del Reporte ({imagenModal.id})
                </span>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary-navy)' }}>
                  {imagenModal.tipo}
                </h3>
              </div>
              <button 
                onClick={() => setImagenModal(null)}
                style={{ border: 'none', background: '#F1F5F9', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} color="var(--text-dark)" />
              </button>
            </div>

            {/* VISUALIZADOR DE LA FOTO GENERADA */}
            <div style={{ background: '#0F172A', borderRadius: '12px', overflow: 'hidden', marginBottom: '12px', border: '1px solid var(--border-subtle)' }}>
              <img 
                src={imagenModal.imagenUrl} 
                alt="Evidencia Fuga"
                style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
              />
            </div>

            <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', marginBottom: '14px', fontSize: '12px' }}>
              <div style={{ fontWeight: 700, color: 'var(--primary-navy)', marginBottom: '2px' }}>
                📍 Ubicación: {imagenModal.direccion}
              </div>
              <div style={{ color: 'var(--text-muted)' }}>
                Enviada por: <b>{imagenModal.reportadoPor}</b> ({imagenModal.fecha})
              </div>
            </div>

            <button className="btn-solid" onClick={() => setImagenModal(null)}>
              Cerrar Fotografía
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
