export function AuthLayout({
    title,
    children
}) {

    return (

        <div className="container d-flex justify-content-center align-items-center min-vh-100">

            <div className="card auth-card shadow-lg p-4">
                 

               <h3 className="fw-bold text-primary mb-3">
                    
                    {title}
                </h3>

                {children}

            </div>

        </div>

    );

}