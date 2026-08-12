import React, { useState } from 'react';
import { SECTORES_MAPA_LA_PAZ, MOCK_NOTIFICACIONES } from './data/mockData';
import WaterStatusCard from './components/dashboard/WaterStatusCard';
import WaterCalendar from './components/calendar/WaterCalendar';
import CitizenReportModal from './components/report/CitizenReportModal';
import NotificationCenter from './components/notifications/NotificationCenter';
import WaterTipsGuide from './components/tips/WaterTipsGuide';
import BottomNavigation from './components/layout/BottomNavigation';
import { Droplet, Wifi, BatteryCharging, MapPin } from 'lucide-react';

export default function App() {
  const [tabActiva, setTabActiva] = useState('dashboard');
  const [coloniaSeleccionada, setColoniaSeleccionada] = useState(SECTORES_MAPA_LA_PAZ[0]);
  const [notificaciones, setNotificaciones] = useState(MOCK_NOTIFICACIONES);

  const handleVerCalendarioColonia = () => {
    setTabActiva('calendario');
  };

  const handleNuevoReporteCreado = (nuevaAlerta) => {
    setNotificaciones((prev) => [nuevaAlerta, ...prev]);
  };

  return (
    <div className="smartphone-container">
      
      {/* STATUS BAR MÓVIL */}
      <header className="status-bar">
        <span>09:41</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary-navy)' }}>SAPA BCS</span>
          <Wifi size={14} color="var(--primary-navy)" />
          <BatteryCharging size={16} color="var(--primary-navy)" />
        </div>
      </header>

      {/* HEADER INSTITUCIONAL */}
      <div className="app-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--primary-navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <Droplet size={20} fill="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary-navy)', lineHeight: 1.1 }}>
              SAPA La Paz
            </h1>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
              Consulta de Tandeo
            </span>
          </div>
        </div>
        
        {/* Badge de colonia activa */}
        <span style={{ fontSize: '11px', fontWeight: 700, background: 'var(--water-light)', color: 'var(--primary-blue)', padding: '4px 8px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <MapPin size={12} /> {coloniaSeleccionada.nombre}
        </span>
      </div>

      {/* ÁREA MÓVIL PRINCIPAL */}
      <main className="mobile-content">
        
        {/* PANTALLAS CONECTADAS */}
        {tabActiva === 'dashboard' && (
          <WaterStatusCard 
            colonia={coloniaSeleccionada}
            colonias={SECTORES_MAPA_LA_PAZ}
            onSelectColonia={setColoniaSeleccionada}
            onVerCalendarioColonia={handleVerCalendarioColonia}
          />
        )}

        {tabActiva === 'calendario' && (
          <WaterCalendar 
            colonia={coloniaSeleccionada}
            colonias={SECTORES_MAPA_LA_PAZ}
            onSelectColonia={setColoniaSeleccionada}
          />
        )}

        {tabActiva === 'guias' && (
          <WaterTipsGuide />
        )}

        {tabActiva === 'reportes' && (
          <CitizenReportModal 
            colonia={coloniaSeleccionada}
            onNuevoReporteCreado={handleNuevoReporteCreado}
          />
        )}

        {tabActiva === 'alertas' && (
          <NotificationCenter 
            coloniaActual={coloniaSeleccionada}
            notificacionesGlobales={notificaciones}
          />
        )}

      </main>

      {/* BOTTOM NAV MÓVIL */}
      <BottomNavigation
        tabActiva={tabActiva}
        setTabActiva={setTabActiva}
        notificacionesCount={notificaciones.filter((n) => !n.leida).length}
      />

    </div>
  );
}
