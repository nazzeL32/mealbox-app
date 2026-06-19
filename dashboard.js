function initDashboard() {

    const page = document.getElementById('page-dashboard');

    if(!page) return;

    fetch('dashboard.php')

    .then(res => res.json())

    .then(data => {

        let rows = '';

        data.orders.forEach(order => {

            rows += `
            <tr>
                <td>${order.id}</td>
                <td>${order.customer}</td>
                <td>${order.status}</td>

                <td>
                    <select onchange="updateStatus('${order.id}',this.value)">

                        <option value="Menunggu Pembayaran"
                        ${order.status==='Menunggu Pembayaran' ? 'selected':''}>
                        Menunggu Pembayaran
                        </option>

                        <option value="Diproses"
                        ${order.status==='Diproses' ? 'selected':''}>
                        Diproses
                        </option>

                        <option value="Dikirim"
                        ${order.status==='Dikirim' ? 'selected':''}>
                        Dikirim
                        </option>

                        <option value="Selesai"
                        ${order.status==='Selesai' ? 'selected':''}>
                        Selesai
                        </option>

                    </select>
                </td>

            </tr>
            `;

        });

        page.innerHTML = `

        <div style="padding:30px">

            <h1>Dashboard Admin MealBox</h1>

            <br>

            <div style="
                display:flex;
                gap:20px;
                margin-bottom:20px;
            ">

                <div class="kpi-card">
                    <h3>Total Pesanan</h3>
                    <h2>${data.totalPesanan}</h2>
                </div>

                <div class="kpi-card">
                    <h3>Pendapatan</h3>
                    <h2>Rp ${Number(data.totalPendapatan).toLocaleString('id-ID')}</h2>
                </div>

                <div class="kpi-card">
                    <h3>Sedang Dikirim</h3>
                    <h2>${data.totalDikirim}</h2>
                </div>

            </div>

            <table
            border="1"
            cellpadding="10"
            width="100%">

                <tr>
                    <th>ID</th>
                    <th>Pelanggan</th>
                    <th>Status</th>
                    <th>Aksi</th>
                </tr>

                ${rows}

            </table>

        </div>
        `;

    })

    .catch(err => {

        console.error(err);

        page.innerHTML =
        '<h2>Dashboard gagal dimuat</h2>';

    });

}

function updateStatus(orderId,status){

    fetch('update_status.php',{

        method:'POST',

        headers:{
            'Content-Type':
            'application/x-www-form-urlencoded'
        },

        body:
        'order_id='+
        encodeURIComponent(orderId)+
        '&status='+
        encodeURIComponent(status)

    })

    .then(res => res.json())

    .then(data => {

        if(data.success){

            alert('Status berhasil diubah');

            initDashboard();

        }

    });

}