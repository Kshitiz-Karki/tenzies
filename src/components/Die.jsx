import PropTypes from 'prop-types';

const Die = ({ content, toggleIsheld, isHeld, id }) => {
  return (
    <section 
      className={`die ${isHeld ? 'isHeld' : ''}`} 
      onClick={() => toggleIsheld(id)}
    >
      <section className="die--content">{content}</section>
    </section>
  )
}

Die.propTypes = {
  content: PropTypes.number,
  toggleIsheld: PropTypes.func,
  isHeld: PropTypes.bool,
  id: PropTypes.string
};

export default Die