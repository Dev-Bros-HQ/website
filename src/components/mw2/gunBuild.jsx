import { useState } from "react";
import { format } from "date-fns";

const GunBuild = ({build}) => {
    const [ showAttachments, setShowAttachments ] = useState(false);

    const { id, gun, createdDate, handle, attachments } = build;
    const {muzzle, barrel, underbarrel, laser, optic, stock, comb, rearGrip, bolt, gaurd, magazine, ammunition} = attachments;
    
    return (<div className="card-wrapper relative">
    <div className="Card-top">
      <div
        key={id}
        className="card w-96 bg-base-content text-base-200 shadow-xl"
      >
        <figure className="h-full max-h-[216px] w-full">
          <img src={gun.imgURL} alt={gun["gun-name"]} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {gun["gun-name"]}
            <div className="badge-primary badge">{gun.class}</div>
          </h2>
          {handle ? (
            <a href={`https://twitter.com/${handle}`} className="link-neutral link flex">
              By: {handle}
              <svg
                width="24px"
                height="24px"
                strokeWidth="1.98"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color="#000000"
                className="ml-3"
              >
                <path
                  d="M23 3.01s-2.018 1.192-3.14 1.53a4.48 4.48 0 00-7.86 3v1a10.66 10.66 0 01-9-4.53s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5 0-.278-.028-.556-.08-.83C21.94 5.674 23 3.01 23 3.01z"
                  stroke="#000000"
                  strokeWidth="1.98"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </a>
          ) : null}
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions items-end justify-between">
            <div className="badge badge-lg">
              Created {format(new Date(createdDate), "P")}
            </div>
            <button onClick={() => setShowAttachments(true)} className="btn-primary btn">
              View
            </button>
          </div>
          {showAttachments ? (
            <div className="card-bottom">
                <h1>{gun["gun-name"]}</h1>
                <div className="flex flex-col items-center gap-3">
                    {muzzle && (<p>{muzzle.value} - X:{muzzle.tuningX} / Y:{muzzle.tuningY}</p>)}
                    {barrel && (<p>{barrel.value} - X:{barrel.tuningX} / Y:{barrel.tuningY}</p>)}
                    {underbarrel && (<p>{underbarrel.value} - X:{underbarrel.tuningX} / Y:{underbarrel.tuningY}</p>)}
                    {laser && <p>{laser.value}</p>}
                    {optic && (<p>{optic.value} - X:{optic.tuningX} / Y:{optic.tuningY}</p>)}
                    {stock && (<p>{stock.value} - X:{stock.tuningX} / Y:{stock.tuningY}</p>)}
                    {comb && <p>{comb.value}</p>}
                    {rearGrip && (<p>{rearGrip.value} - X:{rearGrip.tuningX} / Y:{rearGrip.tuningY}</p>)}
                    {bolt && <p>{bolt.value}</p>}
                    {gaurd && (<p>{gaurd.value} - X:{gaurd.tuningX} / Y:{gaurd.tuningY}</p>)}
                    {magazine && <p>{magazine.value}</p>}
                    {ammunition && (<p>{ammunition.value} - X:{ammunition.tuningX} / Y:{ammunition.tuningY}</p>)}
                </div>
                <button onClick={() => setShowAttachments(false)} className="x btn btn-circle btn-outline">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </div>
          ): null}
        </div>
      </div>
    </div>
  </div>)
}

export default GunBuild