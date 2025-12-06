import React, { useState } from 'react'
import DeleteAccount from '../DeleteAccount/DeleteAccount';
import { MdOpacity } from 'react-icons/md';
function EditProfile() {
  const [Show , setShow] = useState("none")
  const [selected, setSelected] = useState("");
  const [name, setName] = useState("John Smith");
  const [email, setEmail] = useState("Johnsmith@gmail.com");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [loca] =useState([
  {"ar":"القاهرة","en":"Cairo"},
  {"ar":"الجيزة","en":"Giza"},
  {"ar":"الإسكندرية","en":"Alexandria"},
  {"ar":"بورسعيد","en":"Port Said"},
  {"ar":"السويس","en":"Suez"},
  {"ar":"الإسماعيلية","en":"Ismailia"},
  {"ar":"دمياط","en":"Damietta"},
  {"ar":"الدقهلية","en":"Dakahlia"},
  {"ar":"كفر الشيخ","en":"Kafr El Sheikh"},
  {"ar":"الغربية","en":"Gharbia"},
  {"ar":"المنوفية","en":"Monufia"},
  {"ar":"القليوبية","en":"Qalyubia"},
  {"ar":"الشرقية","en":"Sharqia"},
  {"ar":"البحيرة","en":"Beheira"},
  {"ar":"مطروح","en":"Marsa Matrouh"},
  {"ar":"الفيوم","en":"Faiyum"},
  {"ar":"بني سويف","en":"Beni Suef"},
  {"ar":"المنيا","en":"Minya"},
  {"ar":"أسيوط","en":"Assiut"},
  {"ar":"سوهاج","en":"Sohag"},
  {"ar":"قنا","en":"Qena"},
  {"ar":"الأقصر","en":"Luxor"},
  {"ar":"أسوان","en":"Aswan"},
  {"ar":"البحر الأحمر","en":"Red Sea"},
  {"ar":"الوادي الجديد","en":"New Valley"},
  {"ar":"شمال سيناء","en":"North Sinai"},
  {"ar":"جنوب سيناء","en":"South Sinai"}
])

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', { name, email, dob, phone, selected });
  };

  const handlePhotoChange = (e) => {
    // Handle photo change logic here
    console.log('Photo changed:', e.target.files[0]);
  };

  const handlePhotoDelete = () => {
    // Handle photo delete logic here
    console.log('Photo deleted');
  };

  return (
  <div>

  <div  
  onClick={()=>{setShow("flex")}}
  className='flex mt-4 mb-8 justify-between '>
      <a className="ml-32" href="/profile"><i className='bx bx-arrow-back text-2xl'></i> </a>
      <button className='bg-green-700 w-32 h-8 rounded-xl mr-20 text-white'> Delet account</button>
  </div>


<div>
<form onSubmit={handleSubmit} style={{width:"900px", height:"70vh"}} className="border-2 border-gray-200  mx-auto">

  <div className='flex  '>
<div 
          className="relative bg-neutral-primary-soft max-w-xs w-full p-6  text-center "
        >
          <div className="flex flex-col items-center">
            <img
              className="w-48 h-48 "
              src="https://picsum.photos/150"
              alt="image"
            />
          </div>

          <div style={{marginLeft:"45px", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", padding:"5px"}} className='w-48 bg-teal-600 text-white rounded-full  '>
              <label htmlFor="a">Change Photo</label>
              <input onChange={handlePhotoChange} style={{visibility:"hidden", display:"none"}}  type="file" id="a"/>
          </div>
          <div style={{marginLeft:"45px",display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column" , padding:"5px"}} className='w-48 mt-2 bg-red-600 text-white   rounded-full  '>
              <label onClick={handlePhotoDelete}>Delete Photo</label>
              <input style={{visibility:"hidden", display:"none" }}  />
          </div>
</div>

  
  <div className='m-4 ms-20'>
    
  <div className="relative border-2 border-gray-200 z-0 w-96 mb-5 group">
      <input type="text" name="repeat_name" id="floating_repeat_name" value={name} onChange={(e) => setName(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " required />
      <label htmlFor="floating_repeat_name" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Name</label>
  </div>
  <div className="relative border-2 border-gray-200 z-0 w-96 mb-5 group">
      <input type="email" name="floating_email" id="floating_email" value={email} onChange={(e) => setEmail(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " required />
      <label htmlFor="floating_email" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Email address</label>
  </div>


<div className="relative border-2 border-gray-200 z-0 w-96 mb-5 group">
    <input
        type="date"
        name="dob_day"
        id="dob_day"
        maxLength="2"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
        placeholder=" "
        required
    />
    <label
        htmlFor="dob_day"
        className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
        peer-focus:start-0 peer-focus:text-fg-brand
        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
        peer-focus:scale-75 peer-focus:-translate-y-6">
        Date of birth
    </label>
</div>

    <div className="relative border-2 border-gray-200 z-0 w-96 mb-5 group">
        <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " required />
        <label htmlFor="floating_phone" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">Contact information</label>
    </div>
    <div className="relative border-2 border-gray-200 z-0 w-96 mb-5 group">
        <label htmlFor="location" className="absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Location</label>
      <select id="location" className='block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer'
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        style={{width:"100%", padding:"10px", fontSize:"16px"}}
      >
        <option value="">Select Location</option>
        {loca.map((item, index) => (
          <option key={index} value={item.en}>
            {item.en}
          </option>
        ))}
      </select>

    </div>


  <button
  // onClick={()=>{setShow("flex")}}
  type="submit"
  className='bg-green-700 w-32 h-8 rounded-xl mr-20 text-white'>
    Save Change
  </button>
  
  </div>

  </div>
</form>
</div>


      <DeleteAccount display={Show} setDisplay={setShow}/>
    


  </div>
  )
}

export default EditProfile