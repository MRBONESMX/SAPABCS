import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Droplet, Info, X, AlertTriangle, Wrench, MapPin, ZapOff, DropletOff, TrendingDown, AlertOctagon } from 'lucide-react';
import { PERCANCES_MOCK } from '../../data/mockData';

export default function WaterCalendar({ colonia }) {
  const [diaSeleccionado, setDiaSeleccionado] = useState(null);

  // Obtener el día actual en tiempo real del sistema
  const hoyReal = new Date().getDate(); // Ej. 12

  const diasMes = Array.from({ length: 31 }, (_, i) => i + 1);

  const percancesColonia = PERCANCES_MOCK[colonia.id] || [];

  const getEstadoDia = (dia) => {
    const percance = percancesColonia.find((p) => p.dia === dia);
    if (percance) {
      return { tipo: 'percance', data: percance };
    }

    if (colonia.estado === 'mantenimiento' && dia === hoyReal) {
      return { 
        tipo: 'percance', 
        data: { 
          dia: hoyReal, 
          tipo: 'obra_general', 
          titulo: 'Mantenimiento de Red Principal', 
          badge: 'Obra SAPA', 
          color: '#E85D04', 
          bg: '#FFEDD5', 
          desc: 'Cuadrilla reemplazando tubería principal de sector.',
          icono: 'Wrench'
        } 
      };
    }

    if (colonia.diasTandeo.includes(dia)) return { tipo: 'con_agua' };
    return { tipo: 'sin_agua' };
  };

  const renderIconoPercance = (nombreIcono, size = 16, color = '#FFFFFF') => {
    switch (nombreIcono) {
      case 'ZapOff': return <ZapOff size={size} color={color} />;
      case 'DropletOff': return <DropletOff size={size} color={color} />;
      case 'TrendingDown': return <TrendingDown size={size} color={color} />;
      case 'Wrench': return <Wrench size={size} color={color} />;
      default: return <AlertTriangle size={size} color={color} />;
    }
  };

  const totalDiasConAgua = colonia.diasTandeo.length;

  return (
    <div style={{ paddingBottom: '20px' }}>
      
      {/* Header */}
      <div className="clean-card" style={{ marginBottom: '16px', borderTop: '4px solid var(--water-accent)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CalendarIcon color="var(--primary-blue)" size={20} />
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary-navy)' }}>
              Calendario de Tandeo
            </h3>
          </div>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary-blue)', background: 'var(--water-light)', padding: '3px 8px', borderRadius: '6px' }}>
            Agosto 2026
          </span>
        </div>

        {/* Colonia Seleccionada */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#F8FAFC', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-subtle)', margin: '8px 0 12px 0' }}>
          <MapPin size={16} color="var(--water-accent)" />
          <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary-navy)' }}>
            Programación de: <u>{colonia.nombre}</u> ({colonia.zona})
          </span>
        </div>

        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Días con tandeo: <b>{totalDiasConAgua} días</b>. El día de hoy está resaltado con un marco destacado.
        </p>

        {/* Leyenda */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: 'var(--water-accent)' }}>
            <Droplet size={13} color="var(--water-accent)" /> Con Agua
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: 'var(--no-water-gray)' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#CBD5E1' }} /> Sin Agua
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#D90429' }}>
            <AlertOctagon size={13} color="#D90429" /> Ruptura / Fuga
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, color: '#E85D04' }}>
            <ZapOff size={13} color="#E85D04" /> Corte CFE / Obra
          </div>
        </div>
      </div>

      {/* Grid del Mes con el Día de HOY Resaltado */}
      <div className="clean-card">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', gap: '4px', marginBottom: '8px' }}>
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((d) => (
            <span key={d} style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)' }}>
              {d}
            </span>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px' }}>
          {diasMes.map((dia) => {
            const estadoObj = getEstadoDia(dia);
            const isHoy = dia === hoyReal;

            let bg = '#F8FAFC';
            let color = 'var(--text-dark)';
            let border = '1px solid var(--border-subtle)';
            let iconElement = null;

            if (estadoObj.tipo === 'con_agua') {
              bg = 'var(--water-accent)';
              color = 'white';
              border = 'none';
            } else if (estadoObj.tipo === 'percance') {
              bg = estadoObj.data.color;
              color = 'white';
              border = 'none';
              iconElement = renderIconoPercance(estadoObj.data.icono, 11, '#FFFFFF');
            }

            return (
              <button
                key={dia}
                onClick={() => setDiaSeleccionado({ dia, estadoObj })}
                style={{
                  height: '46px',
                  borderRadius: '10px',
                  background: bg,
                  color: color,
                  // Resaltado visual prominente para el día de HOY
                  border: isHoy ? '3px solid #0F172A' : border,
                  boxShadow: isHoy ? '0 0 0 2px #38BDF8, 0 4px 12px rgba(0,0,0,0.15)' : 'none',
                  transform: isHoy ? 'scale(1.05)' : 'none',
                  zIndex: isHoy ? 10 : 1,
                  fontWeight: 800,
                  fontSize: '13px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                <span>{dia}</span>

                {iconElement && (
                  <div style={{ position: 'absolute', top: '2px', right: '3px' }}>
                    {iconElement}
                  </div>
                )}

                {/* Badge HOY Prominente */}
                {isHoy && (
                  <span style={{ fontSize: '8px', background: '#0F172A', color: '#38BDF8', padding: '1px 4px', borderRadius: '4px', position: 'absolute', bottom: '2px', fontWeight: 900, letterSpacing: '0.5px' }}>
                    HOY
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Sheet */}
      {diaSeleccionado && (
        <div className="bottom-sheet-overlay" onClick={() => setDiaSeleccionado(null)}>
          <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-handle" />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Detalle para {colonia.nombre}
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary-navy)' }}>
                  {diaSeleccionado.dia} de Agosto, 2026 {diaSeleccionado.dia === hoyReal ? '(HOY)' : ''}
                </h3>
              </div>
              <button 
                onClick={() => setDiaSeleccionado(null)}
                style={{ border: 'none', background: '#F1F5F9', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} color="var(--text-dark)" />
              </button>
            </div>

            {diaSeleccionado.estadoObj.tipo === 'percance' ? (
              <div 
                style={{ 
                  padding: '14px', 
                  background: diaSeleccionado.estadoObj.data.bg, 
                  borderRadius: '12px', 
                  border: `1.5px solid ${diaSeleccionado.estadoObj.data.color}`, 
                  marginBottom: '16px' 
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ background: diaSeleccionado.estadoObj.data.color, color: 'white', fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '6px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    {renderIconoPercance(diaSeleccionado.estadoObj.data.icono, 12, '#FFFFFF')}
                    {diaSeleccionado.estadoObj.data.badge}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: diaSeleccionado.estadoObj.data.color }}>
                    Incidencia Registrada
                  </span>
                </div>

                <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '4px' }}>
                  {diaSeleccionado.estadoObj.data.titulo}
                </h4>

                <p style={{ fontSize: '12px', color: 'var(--text-dark)', lineHeight: '1.4', marginBottom: '10px' }}>
                  {diaSeleccionado.estadoObj.data.desc}
                </p>

                <div style={{ background: 'white', padding: '8px 10px', borderRadius: '6px', fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
                  ⚠️ <b>Impacto:</b> Posible reducción de presión durante la jornada.
                </div>
              </div>
            ) : (
              <div style={{ padding: '14px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid var(--border-subtle)', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <Clock size={18} color="var(--water-accent)" />
                  <span style={{ fontWeight: 700, fontSize: '14px', color: 'var(--primary-navy)' }}>
                    {diaSeleccionado.estadoObj.tipo === 'con_agua' 
                      ? `Horario Programado: ${colonia.horario}`
                      : 'Sin Servicio Programado'}
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {diaSeleccionado.estadoObj.tipo === 'con_agua'
                    ? `Servicio continuo en la red de ${colonia.nombre}. Se recomienda encender el equipo de bombeo.`
                    : 'Día de descanso de red para presurización de sectores contiguos.'}
                </p>
              </div>
            )}

            <button className="btn-solid" onClick={() => setDiaSeleccionado(null)}>
              Cerrar Detalle
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
