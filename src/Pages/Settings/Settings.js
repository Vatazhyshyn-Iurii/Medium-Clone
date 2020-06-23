import React, {useContext, useEffect, useState} from "react";
import {CurrentUserContext, LOGOUT, SET_AUTHORIZED} from "../../Contexts/CurrentUser";
import useFetch from "../../Hooks/useFetch";
import BackendErrorMessages from "../../Components/BackendErrorMessages";
import useLocalStorage from "../../Hooks/useLocalStorage";
import {Redirect} from "react-router-dom";

const Settings = () => {
  const apiUrl = '/user';

  const [currentUserState, dispatch] = useContext(CurrentUserContext);
  const [{response, error}, doFetch] = useFetch(apiUrl);
  const [image, setImage] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccessfullLogout, setIsSuccessfullLogout] = useState(false);
  const [,setToken] = useLocalStorage('token');


  const handleSubmit = (event) => {
    event.preventDefault();
    doFetch({
      method: 'put',
      data: {
        user: {
          ...currentUserState.currentUser,
          image,
          username,
          bio,
          email,
          password
        }
      }
    })
  };

  const logout = (event) => {
    event.preventDefault();
    setToken('');
    dispatch({ type: LOGOUT });
    setIsSuccessfullLogout(true);
  };

  useEffect(() => {
    if(!currentUserState.currentUser) {
      return;
    }
    setImage(currentUserState.currentUser.image);
    setUsername(currentUserState.currentUser.username);
    setBio(currentUserState.currentUser.bio);
    setEmail(currentUserState.currentUser.email);
  }, [currentUserState.currentUser]);

  useEffect(() => {
    if (!response) {
      return;
    }
    dispatch({ type: SET_AUTHORIZED, payload: response.user });
  }, [response, dispatch]);

  if (isSuccessfullLogout) {
    return <Redirect to='/' />;
  }

  return (
    <div className='settings-page'>
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className='text-xs-center'>Your settings</h1>
            {error && <BackendErrorMessages backendErrors={error.errors} />}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className='form-group'>
                  <input
                    type="text"
                    className='form-control form-control-lg'
                    placeholder='URL of profile picture'
                    value={image}
                    onChange={e => setImage(e.target.value)}
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    type="text"
                    className='form-control form-control-lg'
                    placeholder='Username'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <textarea
                    className='form-control form-control-lg'
                    rows={8}
                    placeholder='Short bio'
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    type="email"
                    className='form-control form-control-lg'
                    placeholder='Email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className='form-group'>
                  <input
                    type="password"
                    className='form-control form-control-lg'
                    placeholder='Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </fieldset>
                <button className='btn btn-lg btn-primary pull-xs-right'>Update settings</button>
              </fieldset>
            </form>
            <hr/>
            <button className='btn btn-outline-danger' onClick={logout}>Or click here to logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;