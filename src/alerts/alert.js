import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

export default function () {
  async function confirmAlert (msg) {
    return Swal.fire({
      title: 'Are you sure?',
      text: msg,
      showDenyButton: true,
      confirmButtonText: 'yes',
      denyButtonText: 'cancel'
    })
  }
  async function message (msg){
    return Swal.fire(
      msg,
      '',
      'success'
    )}
  return { confirmAlert, message }
}
