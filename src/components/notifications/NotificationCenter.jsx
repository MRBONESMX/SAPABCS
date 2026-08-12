import React, { useState } from 'react';
import { Bell, WifiOff, RefreshCw, CheckCircle2, Info, AlertTriangle, MapPin, Filter, ShieldAlert, SlidersHorizontal } from 'lucide-react';
import { MOCK_NOTIFICACIONES } from '../../data/mockData';

export default function NotificationCenter({ coloniaActual, notificacionesGlobales }) {
  const [notificaciones, setNotificaciones] = useState(notificacionesGlobales || MOCK_NOTIFICACIONES);
  
  // Filtro de Prioridad: 'mi_colonia' (Focalizadas exclusivamente a su zona) vs 'todas' (Alertas generales municipio)
  const [filtroPrioridad, setFiltroPrioridad] = useState('mi_colonia');
  const [simularError, setSimularError] = useState(false);

  const maratodasLeidas = () => {
    setNotificaciones((prev) => prev.map((n) => ({ ...n, leida: true })));
  };

  // Filtrado estricto por coloniaId
  const notificacionesFiltradas = notificaciones.filter((notif) => {
    if (filtroPrioridad === 'mi_colonia') {
      // Notificaciones asignadas a su coloniaId o alertas de alcance general (sin coloniaId específica)
      return notif.coloniaId === coloniaActual.id || notif.coloniaId === null || notif.coloniaId === undefined;
    }
    return true; // 'todas'
  });

  return (
    <div style={{ paddingBottom: '20px' }}>
      
      {/* Header Limpio */}
      <div className="clean-card" style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell color="var(--primary-blue)" size={20} />
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary-navy)' }}>
              Centro de Alertas
            </h3>
          </div>
          <button 
            onClick={() => setSimularError(!simularError)}
            style={{
              padding: '3px 8px',
              borderRadius: '6px',
              border: '1px solid var(--border-subtle)',
              background: simularError ? 'var(--warning-orange)' : '#F8FAFC',
              color: simularError ? 'white' : 'var(--text-dark)',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {simularError ? 'Modo Normal' : 'Simular Error Red'}
          </button>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Filtra entre notificaciones exclusivas de tu sector actual o avisos generales de La Paz.
        </p>

        {/* SELECTOR DE PRIORIDAD Y PREFERENCIAS DE NOTIFICACIÓN */}
        <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary-navy)', textTransform: 'uppercase', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <SlidersHorizontal size={13} color="var(--water-accent)" /> Preferencia de Alertas:
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            <button
              onClick={() => setFiltroPrioridad('mi_colonia')}
              style={{
                padding: '8px 10px',
                borderRadius: '8px',
                border: filtroPrioridad === 'mi_colonia' ? '2px solid var(--water-accent)' : '1px solid var(--border-subtle)',
                background: filtroPrioridad === 'mi_colonia' ? 'var(--water-light)' : '#F8FAFC',
                color: filtroPrioridad === 'mi_colonia' ? 'var(--water-accent)' : 'var(--text-muted)',
                fontSize: '11px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}
            >
              <MapPin size={13} /> En {coloniaActual.nombre}
            </button>

            <button
              onClick={() => setFiltroPrioridad('todas')}
              style={{
                padding: '8px 10px',
                borderRadius: '8px',
                border: filtroPrioridad === 'todas' ? '2px solid var(--primary-navy)' : '1px solid var(--border-subtle)',
                background: filtroPrioridad === 'todas' ? '#F1F5F9' : '#F8FAFC',
                color: filtroPrioridad === 'todas' ? 'var(--primary-navy)' : 'var(--text-muted)',
                fontSize: '11px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px'
              }}
            >
              <Bell size={13} /> Alertas de Todo La Paz
            </button>
          </div>
        </div>
      </div>

      {/* VISTA DE ERROR DE RED SIMULADO */}
      {simularError ? (
        <div className="clean-card" style={{ textAlign: 'center', padding: '20px', background: '#F8FAFC' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--warning-light)', color: 'var(--warning-orange)', padding: '4px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, marginBottom: '10px' }}>
            <WifiOff size={14} /> Interrupción Temporal de Servidor
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '6px' }}>
            Servicio de Alertas en Mantenimiento
          </h3>
          
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: '1.4' }}>
            Se detectó un mantenimiento en el servidor de notificaciones push de SAPA. Tus preferencias de colonia están guardadas localmente.
          </p>

          <button className="btn-solid" onClick={() => setSimularError(false)}>
            <RefreshCw size={16} /> Reintentar Conexión
          </button>
        </div>
      ) : (
        /* LISTADO DE NOTIFICACIONES FILTRADAS */
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '0 2px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>
              {filtroPrioridad === 'mi_colonia' ? `ALERTAS EN ${coloniaActual.nombre.toUpperCase()}` : 'TODAS LAS ALERTAS MUNICIPALES'} ({notificacionesFiltradas.length})
            </span>
            <button 
              onClick={maratodasLeidas}
              style={{ border: 'none', background: 'none', color: 'var(--water-accent)', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
            >
              Marcar leídas
            </button>
          </div>

          {notificacionesFiltradas.length === 0 ? (
            <div className="clean-card" style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
              <CheckCircle2 size={32} color="#10B981" style={{ marginBottom: '8px' }} />
              <h5 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-navy)' }}>
                Sin incidencias registradas en {coloniaActual.nombre}
              </h5>
              <p style={{ fontSize: '12px', marginTop: '4px' }}>
                Esta colonia no presenta cortes por fuga ni incidencias exclusivas activas hoy.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {notificacionesFiltradas.map((notif) => (
                <div 
                  key={notif.id} 
                  className="clean-card" 
                  style={{ 
                    marginBottom: 0, 
                    padding: '14px',
                    borderLeft: `4px solid ${notif.tipo === 'info' ? 'var(--water-accent)' : notif.tipo === 'warning' ? 'var(--warning-orange)' : '#10B981'}`,
                    background: notif.leida ? '#F8FAFC' : 'white'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                    <h5 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary-navy)' }}>
                      {notif.titulo}
                    </h5>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600 }}>
                      {notif.tiempo}
                    </span>
                  </div>

                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.4', marginBottom: '6px' }}>
                    {notif.descripcion}
                  </p>

                  {/* Justificación explícita de la alerta */}
                  <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--primary-blue)', background: 'var(--water-light)', padding: '3px 8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={11} /> 
                    {notif.coloniaNombre 
                      ? `Exclusivo para la colonia: ${notif.coloniaNombre}` 
                      : 'Alerta de cobertura general en La Paz'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
