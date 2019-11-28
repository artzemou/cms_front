import React from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { GET_ALL_PAGES } from '../queries/pages'
import { GET_ALL_P_AGES } from '../queries/p_ages'

import { Helmet } from 'react-helmet-async'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { DroppableItemsList } from '../components/DroppableItemsList'
import { SignIn } from '../components/SignIn'
import { SignUp } from '../components/SignUp'
import Example from '../components/Example'
import Ripple from '../components/Ripple'
import UsersList from '../components/UsersList'
import ChatBox from '../components/ChatBox'
import Stripe from '../components/Stripe'

import LocalesSelect from '../components/LocalesSelect'
import T from 'i18n-react'
import r from '../utils/clearURL'


import SortableComponent from '../components/SortableComponent'


function Routes(props) {
  const { data: data1} = useQuery(GET_ALL_PAGES)
  const { data: data2 } = useQuery(GET_ALL_P_AGES)
  console.log(data1)
  if (!data1) {
    return <div>loading...</div>
  }
  return (
    <>
      <header className="App-header"></header>
      <main className="View-content">
        <Router>
          <Route
            render={({ location }) => (
              <>
                <LocalesSelect {...props} />
                <nav className="Nav">
                  <ul>
                    <li className="Nav-item">
                      <Ripple
                        content={
                          <Link
                            className="Nav-link"
                            to={`/${r(T.translate('nav.usersList'))}`}
                          >
                            {T.translate('nav.usersList')}
                          </Link>
                        }
                      />
                    </li>
                    <li className="Nav-item">
                      <Ripple
                        content={
                          <Link
                            className="Nav-link"
                            to={`/${r(T.translate('nav.signup'))}`}
                          >
                            {T.translate('nav.signup')}
                          </Link>
                        }
                      />
                    </li>
                    <li className="Nav-item">
                      <Ripple
                        content={
                          <Link
                            className="Nav-link"
                            to={`/${r(T.translate('nav.signin'))}`}
                          >
                            {T.translate('nav.signin')}
                          </Link>
                        }
                      />
                    </li>
                    <li className="Nav-item">
                      <Ripple
                        content={
                          <Link
                            className="Nav-link"
                            onClick={() => {
                              sessionStorage.removeItem('AUTH_TOKEN')
                              props.updateAuthToken({
                                ...props.state,
                                authToken: null,
                              })
                            }}
                            to="#"
                          >
                            {T.translate('nav.signout')}
                          </Link>
                        }
                      />
                    </li>
                    <li className="Nav-item">
                      <Ripple
                        content={
                          <Link className="Nav-link" to="/">
                            {T.translate('nav.home')}
                          </Link>
                        }
                      />
                    </li>
                    <li className="Nav-item">
                      <Ripple
                        content={
                          <Link
                            className="Nav-link"
                            to={`/${r(T.translate('nav.webtreemanager'))}`}
                          >
                            {T.translate('nav.webtreemanager')}
                          </Link>
                        }
                      />
                    </li>
                    { data1.allPages.map(page => (
                      <li key={page.id} className="Nav-item">
                        <Ripple
                          content={
                            <Link className="Nav-link" to={`/${page.id}`}>
                              {page.content}
                            </Link>
                          }
                          />
                          <ul> 
                          {data2.allP_ages.map(p => page.id === p.parentId ? (
                            <li key={p.id} className="Nav-item" style={{marginLeft:'3rem'}}>
                              <Ripple
                                content={
                                  <Link className="Nav-link" to={`/${p.id}`}>
                                    {p.content}
                                  </Link>
                                }
                              />
                            </li>
                          ) : null)}
                            </ul> 
                        </li>
                    ))}
                  </ul>
                </nav>
                <TransitionGroup className="Transition-group">
                  <CSSTransition
                    key={location.key}
                    timeout={{ enter: 300, exit: 0 }}
                    classNames="fade"
                  >
                    <section className="Route-section">
                      <Switch location={location}>
                        <Route path="/" exact component={Example} />
                        <Route
                          path={`/${r(T.translate('nav.usersList'))}`}
                          exact
                          component={() => <UsersList {...props} />}
                        />
                        <Route path="/chat" exact component={ChatBox} />
                        <Route path="/stripe" exact component={Stripe} />
                        <Route
                          path={`/${r(T.translate('nav.signup'))}`}
                          exact
                          component={SignUp}
                        />
                        {/* <Route path="/" render={() => <div>lorem</div>} /> */}
                        {data1.allPages.map(page => (
                          <Route key={page.id} path={`/${page.id}`} exact>
                            <Helmet>
                              <title>{page.id}</title>
                            </Helmet>
                            <DroppableItemsList />
                          </Route>
                        ))}
                        { data2.allP_ages.map(p =>  (
                            <Route key={p.id} path={`/${p.id}`} exact>
                            <Helmet>
                              <title>{p.id}</title>
                            </Helmet>
                            <DroppableItemsList />
                          </Route>
                        ))}
                        <Route
                          path={`/${r(T.translate('nav.webtreemanager'))}`}
                          render={() =>
                            props.state.authToken ? (
                              <SortableComponent />
                            ) : (
                              <SignIn {...props} />
                            )
                          }
                        />
                        <Route
                          path={`/test`}
                          render={() =>
                            props.state.authToken ? (
                              <SortableComponent />
                            ) : (
                              <SignIn {...props} />
                            )
                          }
                        />
                        <Route render={() => <div>{T.translate('404')}</div>} />
                      </Switch>
                    </section>
                  </CSSTransition>
                </TransitionGroup>
              </>
            )}
          />
        </Router>
      </main>
    </>
  )
}

export default Routes
