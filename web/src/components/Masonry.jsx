// src/components/Masonry.jsx
import { useState, useEffect, useMemo, useRef } from 'react';
import { useTransition, a } from '@react-spring/web';

function Masonry({ data, onItemClick }) {
  const [columns, setColumns] = useState(2);

  useEffect(() => {
    const updateColumns = () => {
      if (window.matchMedia('(min-width: 1500px)').matches) {
        setColumns(5);
      } else if (window.matchMedia('(min-width: 1000px)').matches) {
        setColumns(4);
      } else if (window.matchMedia('(min-width: 600px)').matches) {
        setColumns(3);
      } else {
        setColumns(1);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const ref = useRef();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [heights, gridItems] = useMemo(() => {
    let heights = new Array(columns).fill(0);
    let gridItems = data.map((child) => {
      const column = heights.indexOf(Math.min(...heights));
      const x = (width / columns) * column;
      const y = (heights[column] += child.height) - child.height;
return { ...child, x, y, width: width / columns, height: child.height };
    });
    return [heights, gridItems];
  }, [columns, data, width]);

  const transitions = useTransition(gridItems, {
    keys: (item) => item.id,
    from: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 0 }),
    enter: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 1 }),
    update: ({ x, y, width, height }) => ({ x, y, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  });

  return (
    <div ref={ref} className="relative w-full" style={{ height: Math.max(...heights), minHeight: '300px' }}>
      {transitions((style, item) => (
        <a.div
          key={item.id}
          style={style}
          className="absolute p-[15px] [will-change:transform,width,height,opacity] cursor-pointer"
          onClick={() => {
            console.log("Item image URL:", item.image);
            onItemClick && onItemClick(item);
          }}
        >
          <div className="flex flex-col">
            <div
              className="relative w-full h-full overflow-hidden rounded shadow-lg transition duration-300 ease hover:scale-110"
              style={{
                backgroundColor: '#ffffff',
                backgroundImage: `url("${item.image}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <p className="mt-2 text-center text-xs font-medium text-gray-800">{item.name}</p>
          </div>
        </a.div>
      ))}
    </div>
  );
}

export default Masonry; 