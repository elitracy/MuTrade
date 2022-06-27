const Pool = require('pg').Pool
const pool = new Pool({
  user: 'xdoyzvjyepifbx',
  host: 'ec2-44-199-83-229.compute-1.amazonaws.com',
  database: 'd6kn14ipkk9h79',
  password: 'b133e6cfea96b8992f594499ef2ff35f6d8ad52f0c80ff89168e5b03d8d30321',
})
// psql -h ec2-44-199-83-229.compute-1.amazonaws.com -U xdoyzvjyepifbx d6kn14ipkk9h79
