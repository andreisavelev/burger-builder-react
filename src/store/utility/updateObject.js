export default function updateObject(oldObject, updateProperties) {
  return {
    ...oldObject,
    ...updateProperties,
  };
}
