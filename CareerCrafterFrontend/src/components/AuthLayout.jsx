export function AuthLayout({
    title,
    children
}) {
    return (

        <div className="auth-page">

            <div className="auth-left">
               <i className="bi bi-briefcase-fill auth-icon"></i>

                <h1>CareerCrafter</h1>

                <h4>Connecting Talent with Opportunity</h4>

                <p>
                    Streamline hiring, discover opportunities, and build successful careers together.
                </p>

            </div>

            <div className="auth-right">

                <div className="card auth-card shadow-lg p-4">
                   

                    <h3 className="fw-bold text-primary mb-3">
                        {title}
                    </h3>

                    {children}

                </div>

            </div>

        </div>

    );
}