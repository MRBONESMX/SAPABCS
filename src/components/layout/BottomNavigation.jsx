import React from 'react';
import { Home, Calendar, AlertTriangle, Bell, Lightbulb } from 'lucide-react';

export default function BottomNavigation({ tabActiva, setTabActiva, notificacionesCount }) {
  const tabs = [
    { id: 'dashboard', label: 'Tandeo Hoy', icon: Home },
    { id: 'calendario', label: 'Calendario', icon: Calendar },
    { id: 'guias', label: 'Consejos', icon: Lightbulb },
    { id: 'reportes', label: 'Reportes', icon: AlertTriangle },
    { id: 'alertas', label: 'Alertas', icon: Bell, badge: notificacionesCount },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = tabActiva === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setTabActiva(tab.id)}
            className={`nav-item ${isActive ? 'active' : ''}`}
          >
            <div className="icon-wrapper" style={{ position: 'relative' }}>
              <IconComponent size={20} />
              {tab.badge > 0 && (
                <span 
                  style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-4px',
                    background: 'var(--alert-red)',
                    color: 'white',
                    fontSize: '9px',
                    fontWeight: 800,
                    width: '15px',
                    height: '15px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {tab.badge}
                </span>
              )}
            </div>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
