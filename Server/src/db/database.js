import mysql from "mysql2/promise";

const pool = mysql.createPool({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "",
  database: "point_of_sales",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
