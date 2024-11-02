import { FC, ReactNode } from 'react';

interface HistorySectionProps {
  title: string;
  items: ReactNode[];
}

const HistorySection: FC<HistorySectionProps> = ({ title, items }) => (
  <div style={{ marginBottom: '2rem' }}>
    <h2>{title}</h2>
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

export default HistorySection;
