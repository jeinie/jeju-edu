import Nav from '../../components/Nav';

export default function PartyJoin() {

    const onSubmitHandler = () => {

    }

    return (
      <div>
        <Nav />
        <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', width:'100%', height:'100vh'}}>
            <form style={{display:'flex', flexDirection:'column', marginTop:'20px'}} onSubmit={onSubmitHandler}>
                <label>USERNAME</label>
                <input/>
                <label>PASSWORD</label>
                <input style={{height:'30px', marginBottom:'50px', borderRadius:'15px', background:'#E47B00', border:'0px'}} />
                <br/>
                <button style={{height:'40px', borderRadius:'30px' ,background:'#E47B00', border:'0px', color:'white'}}>
                login
                </button>
            </form>
        </div>
      </div>
    );
  }

  const Input = () => {
    return (
      <></>
    );
  }