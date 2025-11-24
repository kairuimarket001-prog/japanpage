import { useEffect, useState } from 'react';

interface StockItem {
  id: number;
  name: string;
  left: number;
  duration: number;
  delay: number;
  fontSize: number;
  opacity: number;
}

export default function StockWaterfallBackground() {
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [companyNames, setCompanyNames] = useState<string[]>([]);

  useEffect(() => {
    const loadStockNames = async () => {
      try {
        const response = await fetch('/stockcode.json');
        const data = await response.json();
        setCompanyNames(data.companies || []);
      } catch (error) {
        console.error('Failed to load stock names:', error);
      }
    };

    loadStockNames();
  }, []);

  useEffect(() => {
    if (companyNames.length === 0) return;

    const generateStockItem = (id: number): StockItem => ({
      id,
      name: companyNames[Math.floor(Math.random() * companyNames.length)],
      left: Math.random() * 100,
      duration: 8 + Math.random() * 7,
      delay: Math.random() * 10,
      fontSize: 12 + Math.random() * 8,
      opacity: 0.08 + Math.random() * 0.07,
    });

    const items: StockItem[] = [];
    for (let i = 0; i < 30; i++) {
      items.push(generateStockItem(i));
    }
    setStockItems(items);
  }, [companyNames]);

  if (stockItems.length === 0) return null;

  return (
    <div className="stock-waterfall-container">
      {stockItems.map((item) => (
        <div
          key={item.id}
          className="stock-waterfall-item"
          style={{
            left: `${item.left}%`,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            fontSize: `${item.fontSize}px`,
            opacity: item.opacity,
          }}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}
