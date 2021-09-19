import React from 'react';
import './App.css';
import { HomePage } from './pages/homepage/homepage.component';
import { Route, Switch, Redirect } from 'react-router-dom';
import ShopPage from './pages/shop_page/shop_page.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument, addCollectionsAndDoc } from './firebase/firebase.util';
import { connect } from 'react-redux';
import setUser from './redux/user/user_action';
import { selectCurrentUser } from './redux/user/user.selector';
import CheckOut from './pages/checkout/checkout.component';
import { selectCollectionsForOverview } from './redux/shop_data/shop.selector';



// const HatsPage = (props) => {

//   console.log(props);
//   return (
//     <div>
//       <h2>This is a Hat Page.</h2>
//     </div>
//   )
// }

// const Home = (props) => {

//   console.log(props);
//   return (
//     <div>

//       {/* <Link to='/hats'>Man Page</Link> */}
//       {/* <button onClick={()=>{props.history.push('/hats')}}>Hats Page</button> */}

//       <h2>This is a Home Page.</h2>
//     </div>
//   )
// }

// const ManProDetiles = (props) => {
//   console.log(props);
//   return (
//     <div>
//       <h2>This is a Man Page {props.match.params.proID}</h2>
//     </div>
//   )

// }
// const ManPage = (props) => {

//   // console.log(props);
//   console.log(props.history.location.pathname);
//   return (


//     <div>
//       <h2>This is a Man Page</h2>



//       <Link to={`${props.match.url}/13`}> 13 Topics</Link>
//       <Link to={`${props.match.url}/14`}> 14 Topics</Link>
//       <Link to={`${props.match.url}/15`}> 15 Topics</Link>
//       <Link to={`${props.match.url}/16`}> 16 Topics</Link>

//       <br></br>
//       <button onClick={() => { props.history.push(`${props.match.url}/17`) }}>17 Page</button>

//     </div>
//   )
//  }

class App extends React.Component {

  constructor(props) {
    super(props);
  
    this.state = {
      authUser: JSON.parse(localStorage.getItem('authUser')),
    };
  }


  // this is a Obj as it has a null property
  unsubscribeFromAuth = null;


  // data presenting state
  componentDidMount() {

    const { setUserInStore, getColletions } = this.props;

    this.unsubscribeFromAuth = 
    auth.onAuthStateChanged(async authUser => {

      // this.setState({currentUser:user});
      // console.log(this.state.currentUser);
     // console.log("hey", authUser);


      if (authUser) {

        localStorage.setItem('authUser', JSON.stringify(authUser));
        setUserInStore(authUser);
        const userRef = await
         createUserProfileDocument(authUser);

        userRef.onSnapshot(snapShot => {

          setUserInStore({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });
        });
      } else{
        localStorage.removeItem('authUser')
      }

      

      //  Add to Shop Data to Firebase
      // addCollectionsAndDoc('shop_Collection', getColletions.map(({ title, items }) =>
      //   ({ title, items })))


    });







  }

  // when to leave clear out all
  componentWillUnmount() {

    this.unsubscribeFromAuth();
  }

  render() {


    // console.log(this.props);




    return (
      <div>


        <Header ></Header>

        <Switch>
          <Route exact path='/' component={HomePage}></Route>
          <Route exact path={["/shop", "/shop/:categoryId"]} component={ShopPage}></Route>
          <Route exact path='/checkout' component={CheckOut}></Route>


          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUp />
              )
            }


          />


          {/* <Route exact path='/hats' component={ManPage}></Route>
      <Route path='/hats/man/:proID' component={ManProDetiles}></Route> */}

        </Switch>

      </div>

    )


  }

}

const mapStateToProps = state => ({

  // currentUser is a method that hold user State
  currentUser: selectCurrentUser(state),
  getColletions: selectCollectionsForOverview(state)
})


const mapDispatchToProps = dispatch => ({

  setUserInStore: user => dispatch(setUser(user))
  // setData: data => dispatch(setDirData(data))

})



export default connect(mapStateToProps, mapDispatchToProps)(App);
