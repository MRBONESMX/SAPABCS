import React, { useState } from 'react';
import { MapPin, Navigation, Droplet, Clock, Gauge, ShieldCheck, CheckCircle2, AlertTriangle, Wrench, ChevronRight, Search, Calendar as CalendarIcon } from 'lucide-react';

export default function WaterStatusCard({ colonia, colonias, onSelectColonia, onVerCalendarioColonia }) {
  const [busqueda, setBusqueda] = useState('');
  const [obteniendoGps, setObteniendoGps] = useState(false);
  const [gpsMensaje, setGpsMensaje] = useState(null);

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

  const estadoBadge = {
    con_agua: {
      texto: 'CON AGUA HOY',
      bg: '#E6F9F0',
      color: '#047857',
      icon: <Droplet size={14} color="#10B981" />
    },
    sin_agua: {
      texto: 'SIN AGUA HOY',
      bg: '#F1F5F9',
      color: '#475569',
      icon: <AlertTriangle size={14} color="#64748B" />
    },
    mantenimiento: {
      texto: 'EN MANTENIMIENTO',
      bg: '#FFEDD5',
      color: '#C2410C',
      icon: <Wrench size={14} color="#F97316" />
    }
  }[estado];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* 1. GEOLOCALIZACIÓN Y BUSCADOR */}
      <div className="clean-card" style={{ padding: '14px', marginBottom: 0 }}>
        <button
          onClick={handleDetectarUbicacion}
          disabled={obteniendoGps}
          style={{
            width: '100%',
            height: '46px',
            background: 'var(--primary-navy)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '13px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            marginBottom: '12px'
          }}
        >
          <Navigation size={16} color="#38BDF8" />
          <span>{obteniendoGps ? 'Detectando tu sector...' : 'Usar mi ubicación actual (GPS)'}</span>
        </button>

        {gpsMensaje && (
          <div style={{ fontSize: '11px', color: 'var(--water-accent)', fontWeight: 700, textAlign: 'center', marginBottom: '10px', background: 'var(--water-light)', padding: '6px 10px', borderRadius: '8px' }}>
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
              height: '42px',
              background: '#F8FAFC',
              border: '1px solid var(--border-subtle)',
              borderRadius: '10px',
              padding: '0 12px 0 36px',
              fontSize: '13px',
              color: 'var(--primary-navy)',
              outline: 'none'
            }}
          />
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '13px', pointerEvents: 'none' }} />
        </div>
      </div>

      {/* 2. TARJETA PRINCIPAL CON BOTÓN DIRECTO AL CALENDARIO DE ESTA COLONIA */}
      <div className="clean-card" style={{ marginBottom: 0, borderLeft: `6px solid ${estado === 'con_agua' ? '#10B981' : estado === 'mantenimiento' ? '#F97316' : '#94A3B8'}` }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ background: estadoBadge.bg, color: estadoBadge.color, padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
            {estadoBadge.icon}
            {estadoBadge.texto}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
            {colonia.zona}
          </span>
        </div>

        <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary-navy)', margin: '4px 0 2px 0' }}>
          {colonia.nombre}
        </h2>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '14px' }}>
          Estado del servicio de agua potable en esta zona
        </p>

        {/* Métricas */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
          <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>
              <Clock size={13} color="var(--primary-blue)" /> Horario
            </div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary-navy)' }}>
              {horario}
            </div>
          </div>

          <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', marginBottom: '4px' }}>
              <Gauge size={13} color="var(--primary-blue)" /> Presión
            </div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary-navy)' }}>
              {presion}
            </div>
          </div>
        </div>

        {/* Recomendación */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--primary-navy)', background: '#F0F9FF', padding: '8px 12px', borderRadius: '8px', border: '1px solid #BAE6FD', marginBottom: '14px' }}>
          <ShieldCheck size={16} color="var(--water-accent)" />
          <span><b>Tip:</b> {cisternaRecomendada}</span>
        </div>

        {/* BOTÓN DESTACADO PARA IR DIRECTO AL CALENDARIO DE ESTA COLONIA */}
        <button
          onClick={onVerCalendarioColonia}
          className="btn-solid"
          style={{ background: 'var(--water-accent)', color: 'white', borderRadius: '10px', height: '44px' }}
        >
          <CalendarIcon size={18} />
          <span>Ver Calendario Mensual de {colonia.nombre}</span>
          <ChevronRight size={18} />
        </button>

      </div>

      {/* 3. LISTADO DE COLONIAS */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '0 2px' }}>
          <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary-navy)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Seleccionar otra Colonia ({coloniasFiltradas.length})
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {coloniasFiltradas.map((c) => {
            const isSelected = c.id === colonia.id;
            const badge = {
              con_agua: { texto: 'Con Agua', color: '#10B981', bg: '#E6F9F0' },
              sin_agua: { texto: 'Sin Agua', color: '#64748B', bg: '#F1F5F9' },
              mantenimiento: { texto: 'Obra', color: '#F97316', bg: '#FFEDD5' }
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
                      width: '32px', 
                      height: '32px', 
                      borderRadius: '8px', 
                      background: badge.bg, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}
                  >
                    <MapPin size={16} color={badge.color} />
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
                      padding: '3px 8px', 
                      borderRadius: '6px' 
                    }}
                  >
                    {badge.texto}
                  </span>
                  <ChevronRight size={16} color="var(--text-muted)" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
