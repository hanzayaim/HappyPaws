function base64ToBuffer(base64String) {
  if (!base64String) {
    return null;
  }

  const cleanBase64String = base64String.replace(
    /^data:image\/[a-zA-Z]+;base64,/,
    ""
  );

  return Buffer.from(cleanBase64String, "base64");
}

module.exports = { base64ToBuffer };
