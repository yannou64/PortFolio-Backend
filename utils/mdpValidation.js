// Regex pour au moins 8 caractères, au - 1 chiffre, au - 1 caractère spécial
const mdpValidation = /^(?=.{8,}$)(?=.*\d)(?=.*[!@#$%^&*()_\-+=[\]{};:'"\\|,.<>/?`~]).*$/;
export default mdpValidation;
