exports.paginate = (currentPage, size, totalElements, data) => {
  let value = Math.floor(parseInt(totalElements) / parseInt(size))
  let aux = value * size
  let totalPages = aux < totalElements ? value : value - 1

  let first = currentPage > 4 ? currentPage - 3 : 1
  let numbers = []

  while (first <= currentPage + 3 && first <= totalPages + 1) {
    numbers.push(first)
    first++
  }

  return {
    data: data,
    currentPage: currentPage,
    prev: currentPage > 0 ? currentPage - 1 : currentPage,
    next: currentPage < totalPages ? currentPage + 1 : currentPage,
    elementsByPage: size,
    totalElements: totalElements,
    totalPages: totalPages,
    numbersPage: numbers,
  }
}
