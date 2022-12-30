import React from 'react'

const AboutUs = () => {
  return (
    <>    
    <title>The Trade King</title>

   <section id="team">
        <div className="container my-1 py-4 text-center">
            <div className="row mb-1">
                <div className="col">
                    <h1 className='my-1'>Our Team</h1>
                    <p className="my-1">
                        This team page has a quirky, vibrant energy that immediately catches your attention – a good
                        sign for a design company.
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-3 col-md-6 pt-1">
                    <div className="card h-100">
                        <div className="card-body">
                            <img className="img-fouild rounded w-100 mb-5"
                                src="https://i.ibb.co/k0yKw3Y/backenddeveloper.jpg" 
                                alt="Sophie"/>
                            <h3 className='h33'>Meet Rathod</h3>
                            <h5>Backend Enginner</h5>
                            <p>Data Never Lies</p>
                         
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 pt-1">
                    <div className="card h-100">
                        <div className="card-body">
                            <img className="img-fouild rounded w-75 h-65 mb-5"
                                src="https://i.ibb.co/kJGq8Kc/databasenginner.jpg" 
                                alt="lucy"/>
                            <h3 className='h33'>Vijay Dulera</h3>
                            <h5>Database Enginner</h5>
                            <p>Database can be your nightmare</p>
                           
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 pt-1">
                    <div className="card h-100">
                        <div className="card-body">
                            <img className="img-fouild rounded w-100 mb-5"
                                src="https://i.ibb.co/d5FYvRg/Owner.jpg"
                                alt="Brad"/>
                            <h3 className='h33'>Meet Soni</h3>
                            <h5>( CEO / Founder)</h5>
                            <p>Frontend are more hotter than backend and backend are more important than frontend</p>
                            
                        </div>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6 pt-1">
                    <div className="card h-100">
                        <div className="card-body">
                            <img className="img-fouild rounded w-75 mb-5"
                                src="https://i.ibb.co/LRXPf8y/frontenddeveloper.jpg"
                                alt="andres"/>
                            <h3 className='h33'>Nayan Saraviya</h3>
                            <h5>UI / UX Designer</h5>
                            <p>i can do all things in table whether there is space in table or not</p>
                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>

  )
}

export default  AboutUs



