import React from 'react';

const TableHeader = ({ columns, sortColumn, onSort }) => {
  const sort = (path) => {
    if (sortColumn.path === path)
      sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
    else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }

    onSort(sortColumn);
  };

  const renderSortIcon = column => {
    const { path, order } = sortColumn;
    if (column.path !== path) return;
    return <i className={`fas fa-sort-${order === 'asc' ? 'up' : 'down'} ml-1`} />;
  };

  return (
    <thead>
      <tr>
        {columns.map(column => (
          <th
            key={column.path || column.key}
            onClick={() => sort(column.path)}
            className="clickable"
          >
            {column.label}
            {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
