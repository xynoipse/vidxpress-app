const paginate = (items, pageNumber, pageSize) => {
  let start = (pageNumber - 1) * pageSize;
  let end = ((pageNumber + 1) - 1) * pageSize;
  return items.slice(start, end);
}

export default paginate;
