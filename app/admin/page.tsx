export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-muted-foreground mt-2">
                    Welcome to the Paramount Admin Control Panel. Select a category from the sidebar to manage content.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border bg-card text-card-foreground shadow">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Manage Courses</h3>
                    </div>
                    <div className="p-6 pt-0">
                        <p className="text-xs text-muted-foreground">Add, update, or remove courses displayed on the main page.</p>
                    </div>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Manage Ebooks</h3>
                    </div>
                    <div className="p-6 pt-0">
                        <p className="text-xs text-muted-foreground">Upload and manage PDFs and ebooks inventory.</p>
                    </div>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow">
                    <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                        <h3 className="tracking-tight text-sm font-medium">Read Messages</h3>
                    </div>
                    <div className="p-6 pt-0">
                        <p className="text-xs text-muted-foreground">View incoming Contact Us form submissions.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
