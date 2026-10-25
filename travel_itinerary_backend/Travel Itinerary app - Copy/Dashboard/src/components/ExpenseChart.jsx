import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseChart({ activities }) {
  const categoryTotals = (activities || []).reduce((acc, act) => {
    const category = act.category || 'Sightseeing';
    acc[category] = (acc[category] || 0) + (act.cost || 0);
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: ['#6366f1', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="card" style={{ marginTop: '20px' }}>
      <h3>📊 Expense Category Breakdown</h3>
      {Object.keys(categoryTotals).length > 0 ? (
        <div style={{ maxWidth: '320px', margin: '0 auto' }}>
          <Pie data={data} />
        </div>
      ) : (
        <p style={{ color: 'var(--text-muted)' }}>Add costs to see visual budget breakdown.</p>
      )}
    </div>
  );
}