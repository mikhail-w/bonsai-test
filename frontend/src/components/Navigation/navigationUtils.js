export const getLinkPosition = (index, total, radius) => {
  const angleOffset = Math.PI * 0.6;
  const angle = angleOffset + (index / total) * (Math.PI * 0.5);
  const x = radius * Math.cos(angle);
  const y = radius * Math.sin(angle);
  return { x, y };
};
