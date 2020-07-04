var el = document.getElementById('promo');
  if(el){
    el.addEventListener('click', modal);
  }

var le = document.getElementById("submit");
  if (le) {
    le.addEventListener("click", sweet);
  }

var le = document.getElementById("tukuu");
  if (le) {
    le.addEventListener("click", tuku);
  }
//sweet alert berhasil meinsert kritik dan saran
function sweet(){
      Swal.fire({
        icon: 'success',
        title: 'Trimakasih',
        text: 'Telah Memberikan Kritik dan Saranya!',
        timer: 1500
    })
};

function modal(){
      Swal.fire({
       position: 'center',
       icon: 'success',
       title: 'Selamat anda berhasil mendapatakan promo :*',
       showConfirmButton: true,
       timer: 2500
    });
};

function tuku(){
  Swal.fire({
    icon: 'success',
    title: 'Trimakasih',
    text: 'Telah Memesan di Website Kami!',
    timer: 2500
  })
};
