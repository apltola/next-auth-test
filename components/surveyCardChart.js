import { PieChart } from 'react-minimal-pie-chart';

export default function SurveyCardChart({ hasVotes, yes, no }) {
  const chartData = hasVotes
    ? [
        {
          title: 'Yes',
          value: yes,
          color: '#0197F6',
        },
        { title: 'No', value: no, color: '#D7263D' },
      ]
    : [
        {
          title: 'empty',
          value: 1,
          color: '#9C9990',
        },
      ];

  return (
    <PieChart
      lineWidth={20}
      data={chartData}
      label={({ dataEntry }) => {
        if (hasVotes) {
          return Math.round(dataEntry.percentage) + '%';
        }
      }}
      labelStyle={{ fontSize: '8px', fill: 'black' }}
      labelPosition={60}
      style={{
        height: '150px',
        flex: '1.5',
      }}
    />
  );
}
