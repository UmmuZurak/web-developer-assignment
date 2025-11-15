export const selectUsersTemplate = `
SELECT *
FROM users
ORDER BY name
LIMIT ?, ?
`;

export const selectCountOfUsersTemplate = `
SELECT COUNT(*) as count
FROM users
`;

// Template to get address by user ID
export const selectAddressByUserIdTemplate = `
SELECT street, state, city, zipcode
FROM addresses
WHERE user_id = ?
`;
