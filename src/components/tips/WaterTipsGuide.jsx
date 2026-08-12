import React, { useState } from 'react';
import { Droplet, Sun, Moon, CloudRain, ShieldCheck, Thermometer, Sparkles, CheckCircle2, ChevronRight, Info, Lightbulb, Clock } from 'lucide-react';

export default function WaterTipsGuide() {
  const [tipSeleccionado, setTipSeleccionado] = useState(null);

  const CONSEJOS_AGUA = [
    {
      id: 'riego_plantas',
      titulo: 'Riego de Plantas y Jardín',
      horarioIdeal: 'Noche o Temprano (07:00 PM - 07:00 AM)',
      motivo: 'Evita la evaporación solar rápida. Las raíces absorben hasta un 70% más de agua en horarios frescos.',
      icono: <Sun size={20} color="#E85D04" />,
      tag: 'Ahorro del 40%',
      detalles: [
        'En clima semiárido como La Paz BCS, regar entre 11:00 AM y 04:00 PM evapora la mayor parte del agua.',
        'Utiliza agua de reuso de lavado de frutas o verduras para regar macetas.',
        'Riega directo a la raíz, no sobre las hojas para prevenir hongo por calor.'
      ]
    },
    {
      id: 'llenado_tinaco',
      titulo: 'Llenado de Tinacos y Cisternas',
      horarioIdeal: 'En las primeras 3 horas del turno de tandeo',
      motivo: 'El agua llega con mayor presión y pureza al iniciar la presurización de la red residencial.',
      icono: <Droplet size={20} color="var(--water-accent)" />,
      tag: 'Mayor Presión',
      detalles: [
        'Asegúrate de revisar la válvula flotadora del tinaco para evitar desbordes desapercibidos.',
        'Limpia el fondo del tinaco o aljibe cada 6 meses para evitar acumulación de sedimentos.',
        'Desconecta la bomba si la red pierde presión para prevenir quemadura del motor.'
      ]
    },
    {
      id: 'aseo_personal',
      titulo: 'Ducha y Aseo Personal',
      horarioIdeal: 'Mañanas o Tardes (Uso Eficiente)',
      motivo: 'Reducción de consumo en momentos de baja presión de red.',
      icono: <Sparkles size={20} color="#0284C7" />,
      tag: 'Regadera de 5 min',
      detalles: [
        'Coloca una cubeta mientras sale el agua caliente; esta agua sirve para el inodoro o aseo del hogar.',
        'Una ducha de 5 minutos consume 40 litros; una de 15 minutos supera los 130 litros.',
        'Cierra la llave al enjabonarte o lavarte los dientes.'
      ]
    },
    {
      id: 'lavado_ropa',
      titulo: 'Lavado de Ropa y Trastes',
      horarioIdeal: 'Cargas completas en turno de tandeo',
      motivo: 'Maximiza la eficiencia energética y el rendimiento de la reserva de aljibe.',
      icono: <ShieldCheck size={20} color="#10B981" />,
      tag: 'Reuso de Gris',
      detalles: [
        'Junta cargas completas de ropa para aprovechar el ciclo de agua de la lavadora.',
        'El agua del último enjuague de ropa ligera se puede reutilizar para trapeadores.',
        'Enjabona todos los trastes juntos con la llave cerrada y enjuaga al final en bloque.'
      ]
    }
  ];

  return (
    <div style={{ paddingBottom: '20px' }}>
      
      {/* Header Informativo Limpio */}
      <div className="clean-card" style={{ marginBottom: '16px', borderTop: '4px solid var(--water-accent)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Lightbulb color="var(--water-accent)" size={22} />
            <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--primary-navy)' }}>
              Guía de Uso Eficiente del Agua
            </h3>
          </div>
          <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--primary-blue)', background: 'var(--water-light)', padding: '3px 8px', borderRadius: '6px' }}>
            Consejos BCS
          </span>
        </div>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Aprende a aprovechar el agua del tandeo en tu hogar, maximizar la reserva de tinacos y reducir el desperdicio.
        </p>
      </div>

      {/* RECOMENDACIÓN RÁPIDA SEGÚN LA HORA DEL DÍA */}
      <div 
        className="clean-card" 
        style={{ 
          background: 'linear-gradient(135deg, #0B2545, #134074)', 
          color: 'white', 
          marginBottom: '16px',
          padding: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 800, color: '#38BDF8', textTransform: 'uppercase', marginBottom: '6px' }}>
          <Clock size={14} /> Recomendación para el horario actual (Día / Noche)
        </div>
        <h4 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '4px' }}>
          ☀️ Durante el día (Horas de Sol)
        </h4>
        <p style={{ fontSize: '12px', opacity: 0.9, lineHeight: '1.4' }}>
          Prioriza el <b>llenado de tinacos</b> y reserva de aljibe. Evita regar plantas o lavar patios con manguera debido al alto índice de evaporación por temperatura.
        </p>
      </div>

      {/* LISTADO DE TARJETAS INFORMATIVAS INTERACTIVAS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {CONSEJOS_AGUA.map((tip) => (
          <div
            key={tip.id}
            onClick={() => setTipSeleccionado(tip)}
            className="clean-card"
            style={{
              marginBottom: 0,
              padding: '14px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              borderLeft: '4px solid var(--water-accent)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ background: '#F8FAFC', padding: '6px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  {tip.icono}
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-navy)', margin: 0 }}>
                    {tip.titulo}
                  </h4>
                  <span style={{ fontSize: '11px', color: 'var(--water-accent)', fontWeight: 700 }}>
                    {tip.horarioIdeal}
                  </span>
                </div>
              </div>
              <span style={{ fontSize: '10px', fontWeight: 800, color: '#047857', background: '#E6F9F0', padding: '2px 6px', borderRadius: '4px' }}>
                {tip.tag}
              </span>
            </div>

            <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.4', marginTop: '6px' }}>
              {tip.motivo}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px', fontSize: '11px', fontWeight: 700, color: 'var(--primary-blue)', marginTop: '8px' }}>
              <span>Ver recomendaciones detalladas</span>
              <ChevronRight size={14} />
            </div>
          </div>
        ))}
      </div>

      {/* MODAL DETALLADO DEL CONSEJO SELECCIONADO */}
      {tipSeleccionado && (
        <div className="bottom-sheet-overlay" onClick={() => setTipSeleccionado(null)}>
          <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheet-handle" />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div style={{ background: 'var(--water-light)', padding: '8px', borderRadius: '10px' }}>
                {tipSeleccionado.icono}
              </div>
              <div>
                <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--water-accent)', textTransform: 'uppercase' }}>
                  Guía Práctica
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary-navy)' }}>
                  {tipSeleccionado.titulo}
                </h3>
              </div>
            </div>

            <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-subtle)', marginBottom: '14px' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary-navy)', textTransform: 'uppercase', marginBottom: '4px' }}>
                ⏰ Horario Recomendado en La Paz:
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--water-accent)' }}>
                {tipSeleccionado.horarioIdeal}
              </div>
            </div>

            <h5 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary-navy)', marginBottom: '8px' }}>
              Recomendaciones Clave:
            </h5>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {tipSeleccionado.detalles.map((detalle, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: 'var(--text-dark)', lineHeight: '1.4' }}>
                  <CheckCircle2 size={16} color="#10B981" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{detalle}</span>
                </div>
              ))}
            </div>

            <button className="btn-solid" onClick={() => setTipSeleccionado(null)}>
              Entendido
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
