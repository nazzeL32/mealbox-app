/**
 * data.js — Application Data (Menu, Mock Orders, etc.)
 * MealBox Platform
 */

const MENUS = [
  { id:1, name:'Nasi Padang',          desc:'Nasi putih dengan rendang sapi, gulai ayam, perkedel, dan sambal hijau.',        price:25000, image: 'image/nasi padang.jpeg', cat:'nasi',        tags:['popular','spicy'], bg:'#2A1F0D' },
  { id:2, name:'Mie Rebus',            desc:'Mie kuning dengan topping kentang, tahu dan telur rebus.',                price:23000, image: 'image/mi rebus.jpeg', cat:'mie',         tags:['popular'],         bg:'#1A1F0D' },
  { id:3, name:'Nasi Kuning',          desc:'Nasi kuning dengan telur dadar, ayam suwir, sambal teri kacang, bihun goreng, sayuran segar, kerupuk.',               price:25000, image: 'image/nasikuning.jpeg', cat:'nasi',        tags:['spicy'],           bg:'#1F1A0D' },
  { id:4, name:'Salad Sayur',          desc:'Berbagai macam sayuran segar dengan telur rebus, potongan dada ayam, dan salad dressing.',          price:32000, image: 'image/salad.jpeg', cat:'sehat',       tags:['new','veg'],       bg:'#0D1F16' },
  { id:5, name:'Gado-gado',            desc:'Sayuran rebus segar dengan saus kacang kental dan kerupuk udang.',              price:22000, image: 'image/gadogado.jpeg', cat:'vegetarian',  tags:['veg'],             bg:'#0D1A1F' },
  { id:6, name:'Soto Ayam Lamongan',   desc:'Soto ayam kuning gurih dengan lontong, telur, soun, dan kerupuk.',             price:24000, image: 'image/soto.jpeg', cat:'spesial',        tags:['popular'],         bg:'#1F0D1A' },
  { id:7, name:'Rice Bowl Ayam Teriyaki',         desc:'Nasi putih dengan ayam teriyaki, timun dan selada.',           price:22000, image: 'image/ricebowl.jpeg', cat:'nasi',         tags:[],                  bg:'#1A0D1F' },
  { id:8, name:'Nasi Ayam Taliwang',     desc:'Nasi putih dengan ayam taliwang.',               price:20000, image: 'image/Nasi ayam taliwang.jpg', cat:'nasi',  tags:['veg','new'],       bg:'#0D1F10' },
  { id:9, name:'Nasi Liwet',           desc:'Nasi gurih dimasak santan dengan ayam suwir, telur, labu siam.',               price:28000, image: 'image/nasi liwet.jpeg', cat:'spesial',     tags:['popular','new'],   bg:'#1F1A0D' },
];

const MOCK_ORDERS = [
  { id:'MBX-247', customer:'Rina Handayani', menu:'Nasi Padang x2',    status:'delivering', total:50000 },
  { id:'MBX-246', customer:'Dika Nugraha',   menu:'Mie Rebus x1',       status:'processing', total:23000 },
  { id:'MBX-245', customer:'Siti Rahayu',    menu:'Salad Sayur x3',    status:'done',       total:90000 },
  { id:'MBX-244', customer:'Ahmad Fauzi',    menu:'Nasi Kuning x1',    status:'done',       total:25000 },
  { id:'MBX-243', customer:'Linda Kusuma',   menu:'Gado-gado x2',      status:'delivering', total:46000 },
];

const TOP_MENUS = [
  { image: 'image/nasi padang.jpeg', name:'Nasi Padang',      sold:89, pct:100 },
  { image: 'image/mi rebus.jpeg', name:'Mie rebus', sold:74, pct:83  },
  { image: 'image/nasikuning.jpeg', name:'Nasi Kuning',      sold:61, pct:68  },
  { image: 'image/salad.jpeg', name:'Salad Sayur',      sold:43, pct:48  },
];

const WEEKLY_DATA = [
  { day:'Sen', orders:180 },
  { day:'Sel', orders:210 },
  { day:'Rab', orders:195 },
  { day:'Kam', orders:247 },
  { day:'Jum', orders:0   },
  { day:'Sab', orders:0   },
  { day:'Min', orders:0   },
];

function fmt(n) {
  return 'Rp ' + n.toLocaleString('id-ID');
}
