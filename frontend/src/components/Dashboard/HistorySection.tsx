import { FC, ReactNode } from 'react';

interface HistorySectionProps {
  title: string;
  items: ReactNode[];
}

const HistorySection: FC<HistorySectionProps> = ({ title, items }) => (
  <div className="history-section">
    <h2 className="history-title">{title}</h2>
    <ul className="history-list">
      {items.map((item, index) => (
        <li key={index} className="history-item">{item}</li>
      ))}
    </ul>
  </div>
);

export default HistorySection;
