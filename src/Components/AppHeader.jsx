const AppHeader = ({socketState}) => {
    return (
        <div className="flex h-16 justify-center p-8 px-4 mt-4">
            <h1 className="font-sans text-3xl tracking-normal hover:tracking-widest">UA Socket Supporter <span className={'indicator-item badge ' + (socketState && socketState === 1 ? 'badge-success' : 'badge-error')}></span> </h1>
        </div>
    )
}

export default AppHeader;