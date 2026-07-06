export function AuthLayout({
    title,
    children
}) {

    return (

        <div className="container d-flex justify-content-center align-items-center vh-100">

            <div className="card auth-card shadow-lg p-4">

                <h2 className="text-center mb-4">
                    {title}
                </h2>

                {children}

            </div>

        </div>

    );

}