const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const days = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

export default (d: Date) => {
  const year = d.getFullYear();
  const date = d.getDate();
  const monthName = months[d.getMonth()];
  const dayName = days[d.getDay()];
  return `${dayName}, ${date} ${monthName} ${year}`;
};
