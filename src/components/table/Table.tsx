import { useTranslation } from 'react-i18next';
import { useTableState } from '../../hooks/useTableState';
import type { TableConfig } from '../../types/table.types';
import './Table.scss';

interface TableProps<T extends Record<string, unknown>> {
  config: TableConfig<T>;
}

export function Table<T extends Record<string, unknown>>({ config }: TableProps<T>) {
  const { t } = useTranslation();
  const { state, actions, data } = useTableState(config);

  return (
    <div className="table-wrapper">
      <div className="table-controls">
        {config.searchable && (
          <div className="search-container">
            <input
              type="text"
              placeholder={t('table.searchPlaceholder')}
              value={state.inputValue}
              onChange={(e) => actions.setSearch(e.target.value)}
              className="search-input"
            />
          </div>
        )}
      </div>

      <div className="table-container">
        <table className={`generic-table ${config.striped ? 'striped' : ''} ${config.hover ? 'hover' : ''} ${config.rowClickable ? 'row-clickable' : ''}`}>
          <thead>
            <tr>
              {config.columns.map((col) => (
                <th
                  key={String(col.key)}
                  onClick={() => col.sortable && actions.setSortBy(col.key as string)}
                  className={`${col.sortable ? 'sortable' : ''} ${col.className || ''}`}
                  style={{ width: col.width, cursor: col.sortable ? 'pointer' : 'default' }}
                >
                  <span className="header-content">
                    {col.label}
                    {state.sortBy === col.key && (
                      <span className={`sort-icon ${state.sortOrder}`}>
                        {state.sortOrder === 'asc' ? '▲' : '▼'}
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.items.length > 0 ? (
              data.items.map((row, index) => (
                <tr 
                  key={index}
                  onClick={() => config.rowClickable && config.onRowClick?.(row)}
                  className={config.rowClickable ? 'clickable-row' : ''}
                >
                  {config.columns.map((col) => (
                    <td key={String(col.key)} className={col.className || ''}>
                      {col.render ? col.render(row) : String(row[col.key] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={config.columns.length} className="no-data">
                  {t('table.noResults')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {config.paginated && data.totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            disabled={state.page === 1}
            onClick={() => actions.setPage(state.page - 1)}
          >
            {t('table.previous')}
          </button>
          <span className="page-info">
            {t('table.pageInfo', {
              page: state.page,
              totalPages: data.totalPages,
              totalResults: data.totalFiltered,
            })}
          </span>
          <button
            className="pagination-btn"
            disabled={state.page === data.totalPages}
            onClick={() => actions.setPage(state.page + 1)}
          >
            {t('table.next')}
          </button>
        </div>
      )}
    </div>
  );
}

export default Table;
