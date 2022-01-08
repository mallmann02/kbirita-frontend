export default function convertDateFormat(oldDate) {
  const dateString = new Date(oldDate);
  return dateString.toLocaleDateString('in');
}
