import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../common/services/Auth.tsx';
import { trans } from '../common/services/Translation.tsx';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onHandleLogin = async () => {
    // Lanzar peticion para iniciar sesión
    let logRespon = await AuthService.login({
        username: username,
        password: password,
    });
    // Tratar resultado
    if (logRespon.isOk) {
      navigate('/hola-mundo');
    }
  };

  return (
    <>
      <main className="w-100 p-3">
        <div className="card">
          <div className="card-body">
            <div className="d-flex flex-column p-0">
              <form className="container-fluid">
                <div className="row">
                  <div className="col-12 mb-3">
                    <label htmlFor="ctrl_text_to_speech" className="form-label">
                      {trans.user}
                    </label>
                    <div className="input-group">
                      <span className="input-group-text material-icons-sharp">
                        person
                      </span>
                      <input
                        autoFocus
                        type="text"
                        value={username}
                        className="form-control"
                        placeholder={trans.user}
                        onChange={(e) => setUsername((e.target.value || '').trim())}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12 mb-3">
                    <label htmlFor="ctrl_text_to_speech" className="form-label">
                      {trans.password}
                    </label>
                    <div className="input-group">
                      <span className="input-group-text material-icons-sharp">
                        password
                      </span>
                      <input
                        type="password"
                        value={password}
                        className="form-control"
                        placeholder={trans.password}
                        onChange={(e) => setPassword((e.target.value || '').trim())}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 text-center">
                    <button
                      onClick={onHandleLogin}
                      type="button" className="btn btn-dark">
                      <div className="d-flex align-items-center">
                        <span className="material-icons-sharp me-2">login</span>
                        {trans.login}
                      </div>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
