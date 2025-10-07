import React from 'react';

export const Dashboard = () => {
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
    },
    header: {
      marginBottom: '2rem',
      color: 'white',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold' as const,
      marginBottom: '0.5rem',
      textShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    subtitle: {
      fontSize: '1.1rem',
      opacity: 0.9,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
      gap: '1.5rem',
    },
    card: {
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      overflow: 'hidden',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    cardHeader: {
      padding: '1.5rem',
      borderBottom: '1px solid #f0f0f0',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    iconBox: {
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
    },
    cardTitle: {
      fontSize: '1.25rem',
      fontWeight: '600' as const,
      color: '#1f2937',
    },
    cardContent: {
      padding: '1.5rem',
    },
    lineChart: {
      height: '300px',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-around',
      position: 'relative' as const,
      padding: '20px 0',
    },
    linePoint: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      flex: 1,
      position: 'relative' as const,
    },
    lineBar: {
      width: '8px',
      background: 'linear-gradient(to top, #667eea, #764ba2)',
      borderRadius: '4px',
      position: 'relative' as const,
      marginBottom: '10px',
      animation: 'growUp 1s ease-out',
    },
    lineDot: {
      width: '16px',
      height: '16px',
      background: '#667eea',
      border: '3px solid white',
      borderRadius: '50%',
      boxShadow: '0 2px 8px rgba(102, 126, 234, 0.4)',
      position: 'absolute' as const,
      top: '-8px',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    lineLabel: {
      marginTop: '10px',
      fontSize: '0.875rem',
      color: '#666',
      fontWeight: '500' as const,
    },
    lineValue: {
      position: 'absolute' as const,
      top: '-30px',
      fontSize: '0.75rem',
      fontWeight: 'bold' as const,
      color: '#667eea',
      background: 'white',
      padding: '2px 6px',
      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    barChart: {
      height: '300px',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-around',
      gap: '10px',
      padding: '20px 10px',
    },
    barGroup: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      gap: '5px',
    },
    barStack: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      gap: '2px',
    },
    barSegment: {
      width: '60px',
      borderRadius: '4px 4px 0 0',
      transition: 'all 0.3s ease',
      animation: 'growUp 0.8s ease-out',
    },
    barLabel: {
      marginTop: '10px',
      fontSize: '0.875rem',
      color: '#666',
      fontWeight: '500' as const,
    },
    pieChart: {
      height: '300px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '3rem',
    },
    pieCircle: {
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      background: 'conic-gradient(#3b82f6 0deg 208.8deg, #ec4899 208.8deg 360deg)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      animation: 'rotate 1s ease-out',
    },
    pieLegend: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem',
    },
    legendItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    legendColor: {
      width: '24px',
      height: '24px',
      borderRadius: '6px',
    },
    legendText: {
      fontSize: '1rem',
      color: '#1f2937',
    },
    legendValue: {
      fontWeight: 'bold' as const,
      color: '#667eea',
      marginLeft: '0.5rem',
    },
    horizontalChart: {
      height: '300px',
      display: 'flex',
      flexDirection: 'column' as const,
      justifyContent: 'space-around',
      padding: '10px 0',
    },
    horizontalBar: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '0.5rem 0',
    },
    hBarLabel: {
      width: '120px',
      fontSize: '0.875rem',
      color: '#666',
      fontWeight: '500' as const,
      textAlign: 'right' as const,
    },
    hBarContainer: {
      flex: 1,
      height: '30px',
      background: '#f3f4f6',
      borderRadius: '15px',
      overflow: 'hidden',
      position: 'relative' as const,
    },
    hBarFill: {
      height: '100%',
      background: 'linear-gradient(to right, #06b6d4, #3b82f6)',
      borderRadius: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: '10px',
      animation: 'growWidth 1s ease-out',
      transition: 'all 0.3s ease',
    },
    hBarValue: {
      color: 'white',
      fontSize: '0.75rem',
      fontWeight: 'bold' as const,
    },
    alertLegend: {
      display: 'flex',
      justifyContent: 'center',
      gap: '2rem',
      marginTop: '1rem',
      paddingTop: '1rem',
      borderTop: '1px solid #f0f0f0',
    },
    alertLegendItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem',
    },
    alertDot: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
    },
  };

  const eficienciaData = [
    { mes: 'Ene', porcentaje: 85, height: 170 },
    { mes: 'Feb', porcentaje: 88, height: 176 },
    { mes: 'Mar', porcentaje: 92, height: 184 },
    { mes: 'Abr', porcentaje: 87, height: 174 },
    { mes: 'May', porcentaje: 94, height: 188 },
    { mes: 'Jun', porcentaje: 96, height: 192 },
  ];

  const alertasData = [
    { dia: 'Lun', criticas: 48, medias: 100, bajas: 80 },
    { dia: 'Mar', criticas: 32, medias: 120, bajas: 70 },
    { dia: 'Mié', criticas: 60, medias: 88, bajas: 76 },
    { dia: 'Jue', criticas: 40, medias: 112, bajas: 84 },
    { dia: 'Vie', criticas: 24, medias: 80, bajas: 90 },
    { dia: 'Sáb', criticas: 16, medias: 60, bajas: 60 },
    { dia: 'Dom', criticas: 12, medias: 48, bajas: 50 },
  ];

  const callesData = [
    { calle: 'Av. Reforma', reportes: 145, width: '100%' },
    { calle: 'Insurgentes', reportes: 132, width: '91%' },
    { calle: 'Constitución', reportes: 98, width: '68%' },
    { calle: 'Juárez', reportes: 87, width: '60%' },
    { calle: 'Hidalgo', reportes: 76, width: '52%' },
    { calle: 'Morelos', reportes: 65, width: '45%' },
  ];

  return (
    <>
      <style>{`
        @keyframes growUp {
          from {
            transform: scaleY(0);
            transform-origin: bottom;
          }
          to {
            transform: scaleY(1);
            transform-origin: bottom;
          }
        }
        @keyframes growWidth {
          from { width: 0; }
        }
        @keyframes rotate {
          from { transform: rotate(-90deg); }
          to { transform: rotate(0deg); }
        }
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }
        .bar-hover:hover {
          opacity: 0.8;
          transform: scaleX(1.1);
        }
        .h-bar-hover:hover {
          filter: brightness(1.1);
        }
      `}</style>
      
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>Panel de Administración</h1>
          <p style={styles.subtitle}>Monitoreo en tiempo real de operaciones y reportes</p>
        </div>

        <div style={styles.grid}>
          {/* Eficiencia Operativa */}
          <div style={styles.card} className="card-hover">
            <div style={styles.cardHeader}>
              <div style={{...styles.iconBox, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                📈
              </div>
              <div style={styles.cardTitle}>Eficiencia Operativa</div>
            </div>
            <div style={styles.cardContent}>
              <div style={styles.lineChart}>
                {eficienciaData.map((item) => (
                  <div key={item.mes} style={styles.linePoint}>
                    <div style={{...styles.lineBar, height: `${item.height}px`}}>
                      <div style={styles.lineDot}></div>
                      <div style={styles.lineValue}>{item.porcentaje}%</div>
                    </div>
                    <div style={styles.lineLabel}>{item.mes}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alertas por Día */}
          <div style={styles.card} className="card-hover">
            <div style={styles.cardHeader}>
              <div style={{...styles.iconBox, background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)'}}>
                ⚠️
              </div>
              <div style={styles.cardTitle}>Alertas por Día</div>
            </div>
            <div style={styles.cardContent}>
              <div style={styles.barChart}>
                {alertasData.map((item) => (
                  <div key={item.dia} style={styles.barGroup}>
                    <div style={styles.barStack}>
                      <div 
                        className="bar-hover"
                        style={{...styles.barSegment, height: `${item.criticas}px`, background: '#ef4444'}}
                      ></div>
                      <div 
                        className="bar-hover"
                        style={{...styles.barSegment, height: `${item.medias}px`, background: '#f59e0b'}}
                      ></div>
                      <div 
                        className="bar-hover"
                        style={{...styles.barSegment, height: `${item.bajas}px`, background: '#10b981'}}
                      ></div>
                    </div>
                    <div style={styles.barLabel}>{item.dia}</div>
                  </div>
                ))}
              </div>
              <div style={styles.alertLegend}>
                <div style={styles.alertLegendItem}>
                  <div style={{...styles.alertDot, background: '#ef4444'}}></div>
                  <span>Críticas</span>
                </div>
                <div style={styles.alertLegendItem}>
                  <div style={{...styles.alertDot, background: '#f59e0b'}}></div>
                  <span>Medias</span>
                </div>
                <div style={styles.alertLegendItem}>
                  <div style={{...styles.alertDot, background: '#10b981'}}></div>
                  <span>Bajas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Distribución por Género */}
          <div style={styles.card} className="card-hover">
            <div style={styles.cardHeader}>
              <div style={{...styles.iconBox, background: 'linear-gradient(135deg, #3b82f6 0%, #ec4899 100%)'}}>
                👥
              </div>
              <div style={styles.cardTitle}>Distribución por Género</div>
            </div>
            <div style={styles.cardContent}>
              <div style={styles.pieChart}>
                <div style={styles.pieCircle}></div>
                <div style={styles.pieLegend}>
                  <div style={styles.legendItem}>
                    <div style={{...styles.legendColor, background: '#3b82f6'}}></div>
                    <div style={styles.legendText}>
                      Hombres
                      <span style={styles.legendValue}>58%</span>
                    </div>
                  </div>
                  <div style={styles.legendItem}>
                    <div style={{...styles.legendColor, background: '#ec4899'}}></div>
                    <div style={styles.legendText}>
                      Mujeres
                      <span style={styles.legendValue}>42%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reportes por Ubicación */}
          <div style={styles.card} className="card-hover">
            <div style={styles.cardHeader}>
              <div style={{...styles.iconBox, background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)'}}>
                📍
              </div>
              <div style={styles.cardTitle}>Reportes por Ubicación</div>
            </div>
            <div style={styles.cardContent}>
              <div style={styles.horizontalChart}>
                {callesData.map((item) => (
                  <div key={item.calle} style={styles.horizontalBar}>
                    <div style={styles.hBarLabel}>{item.calle}</div>
                    <div style={styles.hBarContainer}>
                      <div className="h-bar-hover" style={{...styles.hBarFill, width: item.width}}>
                        <span style={styles.hBarValue}>{item.reportes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};