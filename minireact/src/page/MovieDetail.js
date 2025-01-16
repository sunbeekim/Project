import React from 'react';
import { Modal } from 'react-bootstrap';

const MovieDetail = ({ movie, show, onHide }) => {
  if (!movie) return null;

  // 배우 목록 문자열로 변환
  const actorList = movie.actors?.actor
    ?.map(actor => actor.actorNm.trim())
    .join(', ');

  // 감독 목록 문자열로 변환
  const directorList = movie.directors?.director
    ?.map(director => director.directorNm)
    .join(', ');

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{movie.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-4">
            {movie.posters ? (
              <img 
                src={movie.posters.split('|')[0]} 
                alt={movie.title} 
                className="img-fluid rounded shadow"
              />
            ) : (
              <div className="bg-light p-5 text-center rounded">
                <span className="text-muted">이미지가 없습니다</span>
              </div>
            )}
          </div>
          
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-md-3 fw-bold">감독</div>
                  <div className="col-md-9">{directorList || '정보없음'}</div>
                </div>
                
                <div className="row mb-3">
                  <div className="col-md-3 fw-bold">출연</div>
                  <div className="col-md-9">{actorList || '정보없음'}</div>
                </div>
                
                <div className="row mb-3">
                  <div className="col-md-3 fw-bold">장르</div>
                  <div className="col-md-9">{movie.genre || '정보없음'}</div>
                </div>
                
                <div className="row mb-3">
                  <div className="col-md-3 fw-bold">제작년도</div>
                  <div className="col-md-9">{movie.prodYear || '정보없음'}</div>
                </div>
                
                <div className="row mb-3">
                  <div className="col-md-3 fw-bold">상영시간</div>
                  <div className="col-md-9">{movie.runtime ? `${movie.runtime}분` : '정보없음'}</div>
                </div>
                
                <div className="row mb-3">
                  <div className="col-md-3 fw-bold">등급</div>
                  <div className="col-md-9">{movie.rating || '정보없음'}</div>
                </div>
                
                <div className="row mb-3">
                  <div className="col-md-3 fw-bold">제작사</div>
                  <div className="col-md-9">{movie.company || '정보없음'}</div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">줄거리</h5>
              </div>
              <div className="card-body">
                {movie.plots?.plot?.[0]?.plotText || '줄거리 정보가 없습니다.'}
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default MovieDetail; 