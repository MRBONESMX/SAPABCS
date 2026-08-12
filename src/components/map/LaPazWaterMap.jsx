import React, { useState } from 'react';
import { MapPin, Info, Layers, CheckCircle2, AlertTriangle, Wrench, Search, Navigation } from 'lucide-react';
import { SECTORES_MAPA_LA_PAZ } from '../../data/mockData';

export default function LaPazWaterMap({ coloniaSeleccionada, onSelectColonia }) {
  const [hoveredColonia, setHoveredColonia] = useState(null);
  const [filtroCapas, setFiltroCapas] = useState('todos'); // 'todos' | 'con_agua' | 'sin_agua'

  const getColorEstado = (estado) => {
    switch (estado) {
      case 'con_agua':
        return { fill: '#10B981', stroke: '#059669', bgBadge: '#E6F9F0', textBadge: '#047857', label: 'Con Agua Hoy' };
      case 'sin_agua':
        return { fill: '#CBD5E1', stroke: '#94A3B8', bgBadge: '#F1F5F9', textBadge: '#475569', label: 'Sin Agua Hoy' };
      case 'mantenimiento':
        return { fill: '#F97316', stroke: '#EA580C', bgBadge: '#FFEDD5', textBadge: '#C2410C', label: 'Mantenimiento' };
      default:
        return { fill: '#94A3B8', stroke: '#64748B', bgBadge: '#F1F5F9', textBadge: '#475569', label: 'Desconocido' };
    }
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      
      {/* MAPA INTERACTIVO VECTORIAL DE TANDEO LA PAZ BCS */}
      <div 
        style={{
          background: '#0F172A', // Fondo oscuro tipo Visor Urbano / GIS
          borderRadius: '16px',
          border: '1px solid #1E293B',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(15, 23, 42, 0.15)'
        }}
      >
        {/* Barra superior de controles del Mapa */}
        <div 
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            right: '12px',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px'
          }}
        >
          {/* Badge de Título del Visor */}
          <div 
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(8px)',
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: 'white',
              fontSize: '11px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Navigation size={13} color="#38BDF8" />
            <span>Visor Urbano Tandeo La Paz</span>
          </div>

          {/* Filtros de Capa */}
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              onClick={() => setFiltroCapas('todos')}
              style={{
                padding: '4px 8px',
                borderRadius: '6px',
                border: 'none',
                background: filtroCapas === 'todos' ? '#0284C7' : 'rgba(15, 23, 42, 0.75)',
                color: 'white',
                fontSize: '10px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Todos
            </button>
            <button
              onClick={() => setFiltroCapas('con_agua')}
              style={{
                padding: '4px 8px',
                borderRadius: '6px',
                border: 'none',
                background: filtroCapas === 'con_agua' ? '#10B981' : 'rgba(15, 23, 42, 0.75)',
                color: 'white',
                fontSize: '10px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Verde (Con Agua)
            </button>
          </div>
        </div>

        {/* CANVAS SVG CON POLÍGONOS DE COLONIAS / SECTORES */}
        <svg 
          viewBox="0 0 420 360" 
          style={{ width: '100%', height: '270px', display: 'block', background: '#09101E' }}
        >
          {/* Silueta de la Bahía de La Paz / Costa (Fondo Geográfico) */}
          <path 
            d="M 10 30 Q 80 120 130 80 Q 200 40 280 90 T 410 70 L 420 0 L 0 0 Z" 
            fill="#0369A1" 
            opacity="0.25" 
          />
          <text x="35" y="55" fill="#38BDF8" fontSize="10" fontWeight="700" opacity="0.6">
            Bahía de La Paz (Ensenada)
          </text>

          {/* Renderizado de Polígonos por Sector */}
          {SECTORES_MAPA_LA_PAZ.map((colonia) => {
            const isSelected = colonia.id === coloniaSeleccionada.id;
            const isHovered = hoveredColonia === colonia.id;
            const configColor = getColorEstado(colonia.estado);

            // Filtrado por capas
            if (filtroCapas === 'con_agua' && colonia.estado !== 'con_agua') return null;

            return (
              <g 
                key={colonia.id}
                onClick={() => onSelectColonia(colonia)}
                onMouseEnter={() => setHoveredColonia(colonia.id)}
                onMouseLeave={() => setHoveredColonia(null)}
                style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
              >
                {/* Polígono del Sector */}
                <path
                  d={colonia.polygonSvg}
                  fill={configColor.fill}
                  fillOpacity={isSelected ? 0.9 : isHovered ? 0.8 : 0.65}
                  stroke={isSelected ? '#FFFFFF' : configColor.stroke}
                  strokeWidth={isSelected ? 3 : 1.5}
                  strokeDasharray={colonia.estado === 'mantenimiento' ? '4,4' : 'none'}
                />

                {/* Pin/Marker en el Centroide del Sector */}
                <circle 
                  cx={colonia.centerLabel.x} 
                  cy={colonia.centerLabel.y - 12} 
                  r={isSelected ? 6 : 4} 
                  fill={isSelected ? '#FFFFFF' : configColor.stroke} 
                />

                {/* Etiqueta de la Colonia */}
                <text
                  x={colonia.centerLabel.x}
                  y={colonia.centerLabel.y + 4}
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize={isSelected ? '11' : '10'}
                  fontWeight={isSelected ? '800' : '600'}
                  style={{ pointerEvents: 'none', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}
                >
                  {colonia.nombre}
                </text>
              </g>
            );
          })}
        </svg>

        {/* LEYENDA OFICIAL ESTILO VISOR URBANO */}
        <div 
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '12px',
            right: '12px',
            background: 'rgba(15, 23, 42, 0.9)',
            backdropFilter: 'blur(8px)',
            borderRadius: '8px',
            padding: '8px 12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '10px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#10B981', fontWeight: 700 }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#10B981' }} />
            Verde: Con Servicio
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#94A3B8', fontWeight: 700 }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#CBD5E1' }} />
            Gris: Sin Servicio
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#F97316', fontWeight: 700 }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#F97316' }} />
            Naranja: Obra
          </div>
        </div>
      </div>

    </div>
  );
}
