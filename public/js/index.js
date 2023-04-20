const price = document.getElementById('price');
const dish = document.getElementById('dish');
const table = document.getElementById('table');
const form = document.getElementById('form');

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
});

window.addEventListener('DOMContentLoaded', () => {
  render();
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if(price.value == '' || dish.value == '' || table.value == '') {
        alert("Enter fields to add a bill.");
        return;
    }

    let order = {
      price: price.value,
      dish: dish.value,
      table: table.value
    };

    try{
        const result = await axiosInstance.post('/add-order', order);
        form.reset();
        render();
      } 
    catch(err) {
          console.log(err);
      }
});

async function render() {
    let res;
        try {
          res = await axiosInstance.get('/orders');
        } catch(err) {
          console.log(err);
          return;
        }

        const orders = res.data;

        document.getElementById('table1').innerHTML = '';
        document.getElementById('table2').innerHTML = '';
        document.getElementById('table3').innerHTML = '';

        orders.forEach(order => {
          const table = document.getElementById(`${order.table}`);
          const li = document.createElement('li');
          
          const orderInfo = `${order.price} - ${order.table} - ${order.dish} `;
          li.appendChild(document.createTextNode(orderInfo));

          const deleteButton = document.createElement('button');
          deleteButton.appendChild(document.createTextNode('DELETE'));
          li.appendChild(deleteButton);
          table.appendChild(li);
          
          deleteButton.addEventListener('click', (e) => {
            deleteUser(order.id);
          });

        });
  }

  async function deleteUser(id) {
    try {
      await axiosInstance.post(`/delete-order/${id}`);
      render();
    } catch(err) {
      console.log(err);
    }
  }