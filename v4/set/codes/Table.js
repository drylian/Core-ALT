const colors = require('colors');

function createCustomTable(title, headers, rows, theme = 'default', style = 'style1') {
  const columnWidths = getColumnWidths(headers, rows);
  const horizontalLine = generateHorizontalLine(columnWidths, theme, style);
  const formattedTitle = formatTitle(title, columnWidths, theme, style);
  const formattedHeaders = formatRow(headers, columnWidths, '|', '|', theme, style);
  const formattedRows = rows.map(row => formatRow(row, columnWidths, '|', '|', theme, style));

  const table = [
    horizontalLine,
    formattedTitle,
    horizontalLine,
    formattedHeaders,
    horizontalLine,
    ...formattedRows,
    horizontalLine
  ].join('\n');

  return table;
}

function getColumnWidths(headers, rows) {
  const columnCount = headers.length;
  const columnWidths = new Array(columnCount).fill(0);

  for (const header of headers) {
    const headerWidth = header.length;
    const columnIndex = headers.indexOf(header);
    columnWidths[columnIndex] = Math.max(columnWidths[columnIndex], headerWidth);
  }

  for (const row of rows) {
    for (const cell of row) {
      const cellWidth = cell.length;
      const columnIndex = row.indexOf(cell);
      columnWidths[columnIndex] = Math.max(columnWidths[columnIndex], cellWidth);
    }
  }

  return columnWidths;
}

function generateHorizontalLine(columnWidths, theme = 'default', style = 'style1') {
  const lineSegments = columnWidths.map(width => '-'.repeat(width + 2));
  const line = `.${lineSegments.join(getLineSeparator(style))}.`;

  if (theme === 'default') {
    return line;
  } else {
    return colors[theme](line);
  }
}

function getLineSeparator(style) {
  if (style === 'style1') {
    return '+';
  } else if (style === 'style2') {
    return '*-.-*';
  } else {
    // Add custom styles here
    return '+';
  }
}

function formatTitle(title, columnWidths, theme = 'default', style = 'style1') {
  const totalWidth = columnWidths.reduce((acc, width) => acc + width + 3, 0);
  const padding = ' '.repeat(Math.floor((totalWidth - title.length) / 2));
  const formattedTitle = `|${padding}${title}${padding}|`;

  if (theme === 'default') {
    return formattedTitle;
  } else {
    return colors[theme](formattedTitle);
  }
}

function formatRow(rowData, columnWidths, leftBorder = '', rightBorder = '', theme = 'default', style = 'style1') {
  const formattedCells = rowData.map((cell, index) => {
    const cellWidth = columnWidths[index];
    const padding = ' '.repeat(Math.max(0, cellWidth - cell.length));
    const formattedCell = ` ${cell}${padding} `;

    if (theme === 'default') {
      return formattedCell;
    } else {
      return colors[theme](formattedCell);
    }
  });

  return `${colors[theme](leftBorder)}${formattedCells.join(colors[theme](getColumnSeparator(style)))}${colors[theme](rightBorder)}`;
}

function getColumnSeparator(style) {
  if (style === 'style1') {
    return '|';
  } else if (style === 'style2') {
    return '|*-*|';
  } else {
    // Add custom styles here
    return '|';
  }
}

module.exports = {
  createCustomTable
};
