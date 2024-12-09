/**
 * Hàm format định dạng tiền tệ Việt Nam
 * @param {*} money Chuỗi tiền tệ cần format
 * @returns Chuỗi tiền tệ đã được format theo dạng Việt Nam.Ví dụ: 100.000 VND
 * Auth: NVQUY (09/12/2024)
 */
const formatMoney = (money) => {
  return money.toLocaleString("it-IT", { style: "currency", currency: "VND" });
};

export { formatMoney };
