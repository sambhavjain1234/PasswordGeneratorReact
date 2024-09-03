import { useState, useCallback , useEffect ,useRef } from 'react'
import './App.css'
function App() 
{
  const [length, setlength] = useState(8)
  const [numall, setnumall] = useState(false)
  const [chars, setchars] = useState(false)
  const [password, setpassword] = useState("")
  const [pd, setpd] = useState("copy")

  const passref = useRef(null)
  const copyto = useCallback (() => {
    setpd("copied !")
    setTimeout(() => {
      setpd("copy")
    },800);
    passref.current?.select()
    window.navigator.clipboard.writeText(password)
  },
   [password])
     
  const passwordGenerator = useCallback(() => {
    let passw = ""
    let str = "qwertyuioplkjhgfdsamnbvcxzLKJHGFDSAQWERTYUIOPMNBVCXZ"
    if (numall) str += "0123456789"
    if (chars) str += "!@#$%^&*()_-+=[]\;',./{}|:<>?"



    for (let index = 0; index <length; index++) {

      let ff = Math.floor(Math.random() * str.length + 1)
      passw += str.charAt(ff)

    }
    setpassword(passw)
    setpd("copy")

  }, [length, numall, chars, setpassword])
  useEffect(() => {passwordGenerator()} ,[length,numall,chars,passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg py-3 px-4 my-8 text-orange-500 bg-gray-600'>
        <h1 className='text-white text-center my-3'>Password Genereator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input type="text"
            value={password}
            className='outline-none py-1 px-3 w-full'
            placeholder='password'
            ref={passref}
            readOnly
          />
          <button 
          onClick={copyto}
         
          className='bg-blue-600 outline-none text-white px-3 py-0.5 shrink-0 hover:bg-blue-700 font-bold transition-all 
            duration-300 transform hover:scale-105'>{pd}</button>
        </div>
        <div className='flex gap-x-2 text-sm'>
          <div className='flex gap-x-1 items-center'>
            <input

              type="range"
              min={6}
              max={16}
              value={length}
              className='cursor-pointer'
              
              onChange={(e) => { setlength(e.target.value) }}
            />
            <label>Length :{length}</label>
          </div>

          <div className='flex gap-x-1 items-center'>
            <input
              type="checkbox"
              defaultChecked={numall}
              id="numberInput"
              onChange={() => {
                setnumall((prev) => !prev);

              }}

            />

            <label>Numbers</label>
          </div>
          <div className='flex gap-x-1 items-center'>
            <input
              type="checkbox"
              defaultChecked={chars}
              id="characterInput"
              onChange={() => {
                setchars((prev) => !prev);

              }}

            />

            <label>Characters</label>
          </div>
        </div>

      </div>

      <footer class="footer">
    <div class="footerContainer">
        <p class="copyright">© sambhav jain</p>
    </div>
</footer>

    </>
  )
}

export default App
