// This backend common should be used by only backend apps i.e. http-backend and ws-backend
export const JWT_SECRET =
  process.env.JWT_SECRET ||
  '123abc456def789ghi012jkl345mno678pqr901stu234vwx567yz8901234567890';
