import React from "react"
import "./Navigation.scss"
import { Link } from "react-router-dom"
import { UnorderedListOutlined, UploadOutlined } from '@ant-design/icons'

const Navigation = () => {
    return (
        <div className="navigation">
            <div>
                <div className="navigation-container">
                    <div className="navigation-container-item">
                        <UnorderedListOutlined className="dashboard-icon"/>
                        <p>
                            <Link className="active-link" to="/dashboard">
                                Dashboard
                            </Link>
                        </p>
                    </div>
                    <div className="navigation-container-item">
                        <UploadOutlined className="dashboard-icon" />
                        <p>
                            <Link to="/dashboard/create" className="active-link">
                                Upload
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navigation;