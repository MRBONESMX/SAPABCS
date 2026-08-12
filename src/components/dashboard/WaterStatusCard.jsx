import React, { useState } from 'react';
import { MapPin, Navigation, Droplet, Clock, Gauge, ShieldCheck, CheckCircle2, AlertTriangle, Wrench, ChevronRight, Search, Calendar as CalendarIcon, Info, Sparkles, Activity, Eye, X, Image as ImageIcon, Map, Layers } from 'lucide-react';
import { FUGAS_REPORTADAS_MOCK } from '../../data/mockData';

export default function WaterStatusCard({ colonia, colonias, onSelectColonia, onVerCalendarioColonia }) {
  const [busqueda, setBusqueda] = useState('');
  const [obteniendoGps, setObteniendoGps] = useState(false);
  const [gpsMensaje, setGpsMensaje] = useState(null);
  
  // Estado para el modal de detalle de fuga desde el mapa
  const [fugaMapaSeleccionada, setFugaMapaSeleccionada] = useState(null);
  const [mostrarMapaGeneral, setMostrarMapaGeneral] = useState(true);

  const coloniasFiltradas = colonias.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.zona.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleDetectarUbicacion = () => {
    if (!navigator.geolocation) {
      setGpsMensaje('Tu navegador no soporta geolocalización');
      return;
    }

    setObteniendoGps(true);
    setGpsMensaje(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setObteniendoGps(false);
        const coloniaDetectada = colonias.find((c) => c.id === 'indeco') || colonias[0];
        onSelectColonia(coloniaDetectada);
        setGpsMensaje(`Ubicación detectada: ${coloniaDetectada.nombre}`);
      },
      (err) => {
        setObteniendoGps(false);
        const coloniaDetectada = colonias.find((c) => c.id === 'indeco') || colonias[0];
        onSelectColonia(coloniaDetectada);
        setGpsMensaje(`Ubicación aproximada: ${coloniaDetectada.nombre}`);
      },
      { timeout: 5000 }
    );
  };

  const { estado, horario, presion, presionPorcentaje, cisternaRecomendada } = colonia;

  const estadoHeroConfig = {
    con_agua: {
      tituloBanner: 'SERVICIO DE AGUA ACTIVO',
      subtitulo: 'Tandeo disponible hoy en tu red residencial',
      colorPrincipal: '#10B981',
      bgHeader: 'linear-gradient(135deg, #064E3B, #047857)',
      colorBadge: '#047857',
      bgBadge: '#E6F9F0',
      iconoHero: <Droplet size={32} color="#10B981" fill="#10B981" />,
      iconoBadge: <CheckCircle2 size={16} color="#10B981" />
    },
    sin_agua: {
      tituloBanner: 'SIN AGUA EN RED HOY',
      subtitulo: 'Día sin tandeo programado en este sector',
      colorPrincipal: '#64748B',
      bgHeader: 'linear-gradient(135deg, #1E293B, #334155)',
      colorBadge: '#475569',
      bgBadge: '#F1F5F9',
      iconoHero: <AlertTriangle size={32} color="#94A3B8" />,
      iconoBadge: <AlertTriangle size={16} color="#64748B" />
    },
    mantenimiento: {
      tituloBanner: 'TRABAJOS DE MANTENIMIENTO',
      subtitulo: 'Cuadrilla de SAPA reparando tubería de red principal',
      colorPrincipal: '#F97316',
      bgHeader: 'linear-gradient(135deg, #7C2D12, #C2410C)',
      colorBadge: '#C2410C',
      bgBadge: '#FFEDD5',
      iconoHero: <Wrench size={32} color="#FB923C" />,
      iconoBadge: <Wrench size={16} color="#F97316" />
    }
  }[estado];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* 1. PRIORIDAD PRIMARIA AL INGRESAR: HERO HEROIC CARD - ¿HAY AGUA O NO HOY? */}
      <div 
        className="clean-card" 
        style={{ 
          marginBottom: 0, 
          padding: 0, 
          overflow: 'hidden',
          border: `2px solid ${estadoHeroConfig.colorPrincipal}`,
          boxShadow: '0 8px 24px -4px rgba(15, 23, 42, 0.12)'
        }}
      >
        <div 
          style={{ 
            background: estadoHeroConfig.bgHeader, 
            color: 'white', 
            padding: '20px',
            position: 'relative'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <span 
              style={{ 
                background: 'white', 
                color: estadoHeroConfig.colorBadge, 
                padding: '4px 10px', 
                borderRadius: '8px', 
                fontSize: '11px', 
                fontWeight: 900, 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '6px'
              }}
            >
              {estadoHeroConfig.iconoBadge}
              {estadoHeroConfig.tituloBanner}
            </span>
            <span style={{ fontSize: '11px', opacity: 0.85, fontWeight: 700 }}>
              Sector: {colonia.zona}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '10px' }}>
            <div>
              <h2 style={{ fontSize: '26px', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: '2px' }}>
                {colonia.nombre}
              </h2>
              <p style={{ fontSize: '13px', opacity: 0.9 }}>
                {estadoHeroConfig.subtitulo}
              </p>
            </div>
            
            <div style={{ background: 'rgba(255,255,255,0.15)', padding: '10px', borderRadius: '14px', backdropFilter: 'blur(4px)' }}>
              {estadoHeroConfig.iconoHero}
            </div>
          </div>
        </div>

        <div style={{ padding: '18px', background: 'white' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
            <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>
                <Clock size={14} color="var(--primary-blue)" /> Horario de Servicio
              </div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-navy)' }}>
                {horario}
              </div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>
                <Gauge size={14} color="var(--primary-blue)" /> Presión Estimada
              </div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-navy)' }}>
                {presion}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', fontWeight: 700 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Activity size={13} color={estadoHeroConfig.colorPrincipal} /> Nivel de flujo residencial
              </span>
              <span style={{ color: estadoHeroConfig.colorPrincipal, fontWeight: 800 }}>{presionPorcentaje}%</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: `${presionPorcentaje}%`, 
                  height: '100%', 
                  background: estadoHeroConfig.colorPrincipal,
                  borderRadius: '4px',
                  transition: 'width 0.5s ease'
                }} 
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--primary-navy)', background: '#F0F9FF', padding: '10px 12px', borderRadius: '10px', border: '1px solid #BAE6FD', marginBottom: '14px' }}>
            <ShieldCheck size={18} color="var(--water-accent)" style={{ flexShrink: 0 }} />
            <span><b>Recomendación:</b> {cisternaRecomendada}</span>
          </div>

          <button
            onClick={onVerCalendarioColonia}
            className="btn-solid"
            style={{ background: 'var(--primary-navy)', color: 'white', borderRadius: '12px', height: '46px' }}
          >
            <CalendarIcon size={18} color="#38BDF8" />
            <span>Ver Calendario de {colonia.nombre}</span>
            <ChevronRight size={18} />
          </button>

        </div>
      </div>

      {/* 2. GEOLOCALIZACIÓN Y BÚSQUEDA */}
      <div className="clean-card" style={{ padding: '14px', marginBottom: 0 }}>
        <button
          onClick={handleDetectarUbicacion}
          disabled={obteniendoGps}
          style={{
            width: '100%',
            height: '44px',
            background: 'var(--water-light)',
            color: 'var(--primary-blue)',
            border: '1px solid #BAE6FD',
            borderRadius: '10px',
            fontSize: '12px',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            marginBottom: '10px'
          }}
        >
          <Navigation size={16} color="var(--water-accent)" />
          <span>{obteniendoGps ? 'Detectando sector...' : 'Usar mi ubicación actual (GPS)'}</span>
        </button>

        {gpsMensaje && (
          <div style={{ fontSize: '11px', color: 'var(--water-accent)', fontWeight: 700, textAlign: 'center', marginBottom: '8px' }}>
            ✓ {gpsMensaje}
          </div>
        )}

        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Buscar colonia..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{
              width: '100%',
              height: '40px',
              background: '#F8FAFC',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '0 12px 0 36px',
              fontSize: '13px',
              color: 'var(--primary-navy)',
              outline: 'none'
            }}
          />
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '12px', pointerEvents: 'none' }} />
        </div>
      </div>

      {/* 3. LISTADO DE SECTORES DE LA PAZ */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '0 2px' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary-navy)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Sectores de La Paz ({coloniasFiltradas.length})
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {coloniasFiltradas.map((c) => {
            const isSelected = c.id === colonia.id;
            const badge = {
              con_agua: { texto: 'Con Agua', color: '#047857', bg: '#E6F9F0', icono: <CheckCircle2 size={13} color="#10B981" /> },
              sin_agua: { texto: 'Sin Agua', color: '#475569', bg: '#F1F5F9', icono: <AlertTriangle size={13} color="#64748B" /> },
              mantenimiento: { texto: 'Obra', color: '#C2410C', bg: '#FFEDD5', icono: <Wrench size={13} color="#F97316" /> }
            }[c.estado];

            return (
              <div
                key={c.id}
                onClick={() => onSelectColonia(c)}
                style={{
                  background: isSelected ? '#F0F9FF' : 'white',
                  border: isSelected ? '2px solid var(--water-accent)' : '1px solid var(--border-subtle)',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div 
                    style={{ 
                      width: '34px', 
                      height: '34px', 
                      borderRadius: '10px', 
                      background: badge.bg, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}
                  >
                    <MapPin size={18} color={badge.color} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-navy)', margin: 0 }}>
                      {c.nombre}
                    </h4>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
                      {c.zona}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span 
                    style={{ 
                      fontSize: '11px', 
                      fontWeight: 800, 
                      color: badge.color, 
                      background: badge.bg, 
                      padding: '4px 8px', 
                      borderRadius: '6px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    {badge.icono}
                    {badge.texto}
                  </span>
                  <ChevronRight size={16} color="var(--text-muted)" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. MAPA GENERAL DE ALERTAS Y FUGAS EN LA PAZ BCS (MOVIDO A LA PARTE INFERIOR) */}
      <div className="clean-card" style={{ marginBottom: 0, padding: '14px', border: '1.5px solid var(--primary-navy)', marginTop: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Map size={20} color="var(--primary-blue)" />
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary-navy)' }}>
              Mapa General de Incidencias La Paz
            </h3>
          </div>
          <button 
            onClick={() => setMostrarMapaGeneral(!mostrarMapaGeneral)}
            style={{ fontSize: '11px', fontWeight: 700, border: 'none', background: 'var(--water-light)', color: 'var(--primary-blue)', padding: '3px 8px', borderRadius: '6px', cursor: 'pointer' }}
          >
            {mostrarMapaGeneral ? 'Ocultar Mapa' : 'Mostrar Mapa'}
          </button>
        </div>

        {mostrarMapaGeneral && (
          <div 
            style={{
              background: '#0F172A',
              borderRadius: '12px',
              height: '210px',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg, #94A3B8 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
            
            <div style={{ position: 'absolute', top: '8px', left: '10px', fontSize: '10px', color: '#38BDF8', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(15, 23, 42, 0.8)', padding: '2px 6px', borderRadius: '4px' }}>
              <Layers size={12} /> Costa / Bahía de La Paz (GPS Activo)
            </div>

            {/* PINES INTERACTIVOS DE FUGAS REPORTADAS */}
            {FUGAS_REPORTADAS_MOCK.map((fuga) => (
              <div
                key={fuga.id}
                onClick={() => setFugaMapaSeleccionada(fuga)}
                style={{
                  position: 'absolute',
                  top: fuga.coords.top,
                  left: fuga.coords.left,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 10,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <div 
                  style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    background: fuga.confirmacionesVecinos >= 3 ? '#0077B6' : '#E85D04',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    border: '1.5px solid white'
                  }}
                >
                  <AlertTriangle size={12} />
                  <span>{fuga.tipo}</span>
                </div>
                <span style={{ fontSize: '9px', color: '#FFFFFF', fontWeight: 800, background: 'rgba(0,0,0,0.7)', padding: '1px 4px', borderRadius: '3px', marginTop: '2px' }}>
                  {fuga.colonia}
                </span>
              </div>
            ))}

            <div style={{ position: 'absolute', bottom: '8px', left: '10px', right: '10px', background: 'rgba(15, 23, 42, 0.85)', padding: '4px 8px', borderRadius: '6px', fontSize: '10px', color: '#94A3B8', display: 'flex', justifyContent: 'space-between' }}>
              <span>📍 Toca cualquier pin para ver evidencia e imágenes de la fuga</span>
            </div>
          </div>
        )}
      </div>

      {/* MODAL DETALLE DE FUGA SELECCIONADA DESDE EL MAPA GENERAL */}
      {fugaMapaSeleccionada && (
        <div className="bottom-sheet-overlay" onClick={() => setFugaMapaSeleccionada(null)}>
          <div className="bottom-sheet" onClick={(e) => e.stopPropagation()} style={{ padding: '16px' }}>
            <div className="sheet-handle" />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div>
                <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--water-accent)', textTransform: 'uppercase' }}>
                  Incidencia Detectada en Mapa ({fugaMapaSeleccionada.id})
                </span>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary-navy)' }}>
                  {fugaMapaSeleccionada.tipo}
                </h3>
              </div>
              <button 
                onClick={() => setFugaMapaSeleccionada(null)}
                style={{ border: 'none', background: '#F1F5F9', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} color="var(--text-dark)" />
              </button>
            </div>

            {fugaMapaSeleccionada.imagenUrl && (
              <div style={{ background: '#0F172A', borderRadius: '12px', overflow: 'hidden', marginBottom: '12px', border: '1px solid var(--border-subtle)' }}>
                <img 
                  src={fugaMapaSeleccionada.imagenUrl} 
                  alt="Evidencia Fuga Mapa"
                  style={{ width: '100%', height: '210px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            )}

            <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-subtle)', marginBottom: '14px', fontSize: '12px' }}>
              <div style={{ fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '2px' }}>
                📍 {fugaMapaSeleccionada.direccion} ({fugaMapaSeleccionada.colonia})
              </div>
              <div style={{ color: 'var(--text-muted)', marginBottom: '4px' }}>
                Origen: <b>{fugaMapaSeleccionada.origen}</b>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--primary-blue)', fontWeight: 700 }}>
                Reportado por: {fugaMapaSeleccionada.reportadoPor} | Confirmaciones vecinales: {fugaMapaSeleccionada.confirmacionesVecinos}
              </div>
            </div>

            <button className="btn-solid" onClick={() => setFugaMapaSeleccionada(null)}>
              Cerrar Detalle del Mapa
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
